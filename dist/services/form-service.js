"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormService = void 0;
const prisma_1 = require("../lib/prisma");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
class FormService {
    constructor() {
        this.scraperOutputPath = path.join(__dirname, "../../scraper/output/udyam-form-schema.json");
    }
    async getAllFormFields() {
        const fields = await prisma_1.prisma.formField.findMany({
            orderBy: [{ step: "asc" }, { order: "asc" }],
        });
        return fields;
    }
    async getFormFieldsByStep(step) {
        const fields = await prisma_1.prisma.formField.findMany({
            where: { step },
            orderBy: { order: "asc" },
        });
        return fields;
    }
    async updateFormField(id, updateData) {
        const field = await prisma_1.prisma.formField.findUnique({
            where: { id },
        });
        if (!field) {
            throw new Error("Form field not found");
        }
        const updated = await prisma_1.prisma.formField.update({
            where: { id },
            data: {
                ...updateData,
                updatedAt: new Date(),
            },
        });
        return updated;
    }
    async getFormSchema() {
        try {
            // Try to load from scraper output first
            if (await fs.pathExists(this.scraperOutputPath)) {
                const schema = await fs.readJSON(this.scraperOutputPath);
                return schema;
            }
            // Fallback to database
            const fields = await this.getAllFormFields();
            const validationRules = await prisma_1.prisma.validationRule.findMany();
            // Group fields by step
            const steps = [];
            const step1Fields = fields.filter((f) => f.step === 1);
            const step2Fields = fields.filter((f) => f.step === 2);
            if (step1Fields.length > 0) {
                steps.push({
                    stepNumber: 1,
                    title: "Aadhaar Verification",
                    fields: step1Fields,
                });
            }
            if (step2Fields.length > 0) {
                steps.push({
                    stepNumber: 2,
                    title: "PAN Verification",
                    fields: step2Fields,
                });
            }
            return {
                title: "Udyam Registration",
                steps,
                validationRules,
                metadata: {
                    source: "database",
                    generatedAt: new Date().toISOString(),
                },
            };
        }
        catch (error) {
            throw new Error("Failed to get form schema: " + error);
        }
    }
    async refreshFormSchema() {
        try {
            // Load fresh schema from scraper output
            if (!(await fs.pathExists(this.scraperOutputPath))) {
                throw new Error("Scraper output not found. Please run the scraper first.");
            }
            const schema = await fs.readJSON(this.scraperOutputPath);
            // Update database with fresh schema
            await this.updateDatabaseFromSchema(schema);
            return schema;
        }
        catch (error) {
            throw new Error("Failed to refresh form schema: " + error);
        }
    }
    async updateDatabaseFromSchema(schema) {
        // Update form fields
        for (const step of schema.steps) {
            for (const field of step.fields) {
                await prisma_1.prisma.formField.upsert({
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
                });
            }
        }
        // Update validation rules
        for (const rule of schema.validationRules) {
            await prisma_1.prisma.validationRule.upsert({
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
            });
        }
    }
}
exports.FormService = FormService;
//# sourceMappingURL=form-service.js.map