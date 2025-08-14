import type { Request, Response } from "express"
import { FormService } from "../services/form-service"
import type { ApiResponse } from "../types"

export class FormController {
  private formService: FormService

  constructor() {
    this.formService = new FormService()
  }

  async getFormFields(req: Request, res: Response): Promise<void> {
    try {
      const fields = await this.formService.getAllFormFields()

      const response: ApiResponse = {
        success: true,
        data: fields,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Get form fields error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get form fields",
      }

      res.status(500).json(response)
    }
  }

  async getFormFieldsByStep(req: Request, res: Response): Promise<void> {
    try {
      const stepNumber = Number.parseInt(req.params.stepNumber)

      if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 2) {
        const response: ApiResponse = {
          success: false,
          error: "Invalid step number. Must be 1 or 2.",
        }
        res.status(400).json(response)
        return
      }

      const fields = await this.formService.getFormFieldsByStep(stepNumber)

      const response: ApiResponse = {
        success: true,
        data: fields,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Get form fields by step error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get form fields",
      }

      res.status(500).json(response)
    }
  }

  async updateFormField(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updateData = req.body

      const result = await this.formService.updateFormField(id, updateData)

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Update form field error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update form field",
      }

      res.status(400).json(response)
    }
  }

  async getFormSchema(req: Request, res: Response): Promise<void> {
    try {
      const schema = await this.formService.getFormSchema()

      const response: ApiResponse = {
        success: true,
        data: schema,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Get form schema error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get form schema",
      }

      res.status(500).json(response)
    }
  }

  async refreshFormSchema(req: Request, res: Response): Promise<void> {
    try {
      const schema = await this.formService.refreshFormSchema()

      const response: ApiResponse = {
        success: true,
        data: schema,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Refresh form schema error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to refresh form schema",
      }

      res.status(500).json(response)
    }
  }
}
