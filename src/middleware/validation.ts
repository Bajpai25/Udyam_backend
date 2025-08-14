import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import type { ApiResponse, ValidationError } from "../types"

export class ValidationMiddleware {
  static handleValidationErrors(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const validationErrors: ValidationError[] = errors.array().map((error) => ({
        field: error.type === "field" ? error.path : "unknown",
        message: error.msg,
        code: "VALIDATION_ERROR",
      }))

      const response: ApiResponse = {
        success: false,
        error: "Validation failed",
        errors: validationErrors,
      }

      res.status(400).json(response)
      return
    }

    next()
  }

  static async validateUniqueAadhaar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { aadhaarNumber } = req.body

      if (!aadhaarNumber) {
        next()
        return
      }

      // This would be implemented with actual database check
      // For now, just pass through
      next()
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: "Failed to validate Aadhaar uniqueness",
      }

      res.status(500).json(response)
    }
  }

  static async validateUniquePan(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { panNumber } = req.body

      if (!panNumber) {
        next()
        return
      }

      // This would be implemented with actual database check
      // For now, just pass through
      next()
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: "Failed to validate PAN uniqueness",
      }

      res.status(500).json(response)
    }
  }
}
