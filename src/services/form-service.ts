import { prisma } from "../lib/prisma"
import * as fs from "fs-extra"
import * as path from "path"

export class FormService {
  private scraperOutputPath = path.join(__dirname, "../../scraper/output/udyam-form-schema.json")

  async getAllFormFields() {
    const fields = await prisma.formField.findMany({
      orderBy: [{ step: "asc" }, { order: "asc" }],
    })

    return fields
  }

  async getFormFieldsByStep(step: number) {
    const fields = await prisma.formField.findMany({
      where: { step },
      orderBy: { order: "asc" },
    })

    return fields
  }

  async updateFormField(id: string, updateData: any) {
    const field = await prisma.formField.findUnique({
      where: { id },
    })

    if (!field) {
      throw new Error("Form field not found")
    }

    const updated = await prisma.formField.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    })

    return updated
  }

  async getFormSchema() {
    try {
      // Try to load from scraper output first
      if (await fs.pathExists(this.scraperOutputPath)) {
        const schema = await fs.readJSON(this.scraperOutputPath)
        return schema
      }

      // Fallback to database
      const fields = await this.getAllFormFields()
      const validationRules = await prisma.validationRule.findMany()

      // Group fields by step
      const steps = []
      const step1Fields = fields.filter((f) => f.step === 1)
      const step2Fields = fields.filter((f) => f.step === 2)

      if (step1Fields.length > 0) {
        steps.push({
          stepNumber: 1,
          title: "Aadhaar Verification",
          fields: step1Fields,
        })
      }

      if (step2Fields.length > 0) {
        steps.push({
          stepNumber: 2,
          title: "PAN Verification",
          fields: step2Fields,
        })
      }

      return {
        title: "Udyam Registration",
        steps,
        validationRules,
        metadata: {
          source: "database",
          generatedAt: new Date().toISOString(),
        },
      }
    } catch (error) {
      throw new Error("Failed to get form schema: " + error)
    }
  }

  async refreshFormSchema() {
    try {
      // Load fresh schema from scraper output
      if (!(await fs.pathExists(this.scraperOutputPath))) {
        throw new Error("Scraper output not found. Please run the scraper first.")
      }

      const schema = await fs.readJSON(this.scraperOutputPath)

      // Update database with fresh schema
      await this.updateDatabaseFromSchema(schema)

      return schema
    } catch (error) {
      throw new Error("Failed to refresh form schema: " + error)
    }
  }

  private async updateDatabaseFromSchema(schema: any) {
    // Update form fields
    for (const step of schema.steps) {
      for (const field of step.fields) {
        await prisma.formField.upsert({
          where: { fieldName: field.name },
          update: {
            fieldType: field.type,
            label: field.label,
            placeholder: field.placeholder || null,
            required: field.required,
            validation: field.validation || null,
            options: field.options || null,
            step: field.step,
            order: field.order || 0,
            updatedAt: new Date(),
          },
          create: {
            fieldName: field.name,
            fieldType: field.type,
            label: field.label,
            placeholder: field.placeholder || null,
            required: field.required,
            validation: field.validation || null,
            options: field.options || null,
            step: field.step,
            order: field.order || 0,
          },
        })
      }
    }

    // Update validation rules
    for (const rule of schema.validationRules) {
      await prisma.validationRule.upsert({
        where: {
          fieldName_ruleType: {
            fieldName: rule.field,
            ruleType: "regex",
          },
        },
        update: {
          ruleValue: rule.rule,
          message: rule.message,
          updatedAt: new Date(),
        },
        create: {
          fieldName: rule.field,
          ruleType: "regex",
          ruleValue: rule.rule,
          message: rule.message,
        },
      })
    }
  }
}
