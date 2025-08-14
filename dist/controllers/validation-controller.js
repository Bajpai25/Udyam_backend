"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationController = void 0;
const validation_service_1 = require("../services/validation-service");
class ValidationController {
    constructor() {
        this.validationService = new validation_service_1.ValidationService();
    }
    async validateAadhaar(req, res) {
        try {
            const { aadhaarNumber } = req.body;
            const result = await this.validationService.validateAadhaar(aadhaarNumber);
            const response = {
                success: true,
                data: result,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Aadhaar validation error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to validate Aadhaar",
            };
            res.status(400).json(response);
        }
    }
    async validatePan(req, res) {
        try {
            const { panNumber } = req.body;
            const result = await this.validationService.validatePan(panNumber);
            const response = {
                success: true,
                data: result,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("PAN validation error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to validate PAN",
            };
            res.status(400).json(response);
        }
    }
    async validateMobile(req, res) {
        try {
            const { mobileNumber } = req.body;
            const result = await this.validationService.validateMobile(mobileNumber);
            const response = {
                success: true,
                data: result,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Mobile validation error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to validate mobile number",
            };
            res.status(400).json(response);
        }
    }
    async getPinCodeInfo(req, res) {
        try {
            const { code } = req.params;
            const result = await this.validationService.getPinCodeInfo(code);
            const response = {
                success: true,
                data: result,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("PIN code info error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to get PIN code information",
            };
            res.status(400).json(response);
        }
    }
    async getValidationRules(req, res) {
        try {
            const rules = await this.validationService.getAllValidationRules();
            const response = {
                success: true,
                data: rules,
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Get validation rules error:", error);
            const response = {
                success: false,
                error: error instanceof Error ? error.message : "Failed to get validation rules",
            };
            res.status(500).json(response);
        }
    }
}
exports.ValidationController = ValidationController;
//# sourceMappingURL=validation-controller.js.map