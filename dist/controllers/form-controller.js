"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormController = void 0;
const form_service_1 = require("../services/form-service");
class FormController {
    constructor() {
        this.formService = new form_service_1.FormService();
    }
    async getFormFields(req, res) {
        try {
            const fields = await this.formService.getAllFormFields();
            const response = {
                success: true,
                data: fields,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Get form fields error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to get form fields",
            };
            res.status(500).json(response);
        }
    }
    async getFormFieldsByStep(req, res) {
        try {
            const stepNumber = Number.parseInt(req.params.stepNumber);
            if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 2) {
                const response = {
                    success: false,
                    error: "Invalid step number. Must be 1 or 2.",
                };
                res.status(400).json(response);
                return;
            }
            const fields = await this.formService.getFormFieldsByStep(stepNumber);
            const response = {
                success: true,
                data: fields,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Get form fields by step error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to get form fields",
            };
            res.status(500).json(response);
        }
    }
    async updateFormField(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const result = await this.formService.updateFormField(id, updateData);
            const response = {
                success: true,
                data: result,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Update form field error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to update form field",
            };
            res.status(400).json(response);
        }
    }
    async getFormSchema(req, res) {
        try {
            const schema = await this.formService.getFormSchema();
            const response = {
                success: true,
                data: schema,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Get form schema error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to get form schema",
            };
            res.status(500).json(response);
        }
    }
    async refreshFormSchema(req, res) {
        try {
            const schema = await this.formService.refreshFormSchema();
            const response = {
                success: true,
                data: schema,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Refresh form schema error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to refresh form schema",
            };
            res.status(500).json(response);
        }
    }
}
exports.FormController = FormController;
//# sourceMappingURL=form-controller.js.map