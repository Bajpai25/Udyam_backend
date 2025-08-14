"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
class ValidationMiddleware {
    static handleValidationErrors(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const validationErrors = errors.array().map((error) => ({
                field: error.type === "field" ? error.path : "unknown",
                message: error.msg,
                code: "VALIDATION_ERROR",
            }));
            const response = {
                success: false,
                error: "Validation failed",
                errors: validationErrors,
            };
            res.status(400).json(response);
            return;
        }
        next();
    }
    static async validateUniqueAadhaar(req, res, next) {
        try {
            const { aadhaarNumber } = req.body;
            if (!aadhaarNumber) {
                next();
                return;
            }
            // This would be implemented with actual database check
            // For now, just pass through
            next();
        }
        catch (error) {
            const response = {
                success: false,
                error: "Failed to validate Aadhaar uniqueness",
            };
            res.status(500).json(response);
        }
    }
    static async validateUniquePan(req, res, next) {
        try {
            const { panNumber } = req.body;
            if (!panNumber) {
                next();
                return;
            }
            // This would be implemented with actual database check
            // For now, just pass through
            next();
        }
        catch (error) {
            const response = {
                success: false,
                error: "Failed to validate PAN uniqueness",
            };
            res.status(500).json(response);
        }
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validation.js.map