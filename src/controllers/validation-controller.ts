import type { Request, Response } from "express"
import { ValidationService } from "../services/validation-service"
import type { ApiResponse } from "../types"

export class ValidationController {
  private validationService: ValidationService

  constructor() {
    this.validationService = new ValidationService()
  }

  async validateAadhaar(req: Request, res: Response): Promise<void> {
    try {
      const { aadhaarNumber } = req.body

      const result = await this.validationService.validateAadhaar(aadhaarNumber)

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Aadhaar validation error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to validate Aadhaar",
      }

      res.status(400).json(response)
    }
  }

  async validatePan(req: Request, res: Response): Promise<void> {
    try {
      const { panNumber } = req.body

      const result = await this.validationService.validatePan(panNumber)

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("PAN validation error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to validate PAN",
      }

      res.status(400).json(response)
    }
  }

  async validateMobile(req: Request, res: Response): Promise<void> {
    try {
      const { mobileNumber } = req.body

      const result = await this.validationService.validateMobile(mobileNumber)

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Mobile validation error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to validate mobile number",
      }

      res.status(400).json(response)
    }
  }

  async getPinCodeInfo(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.params

      const result = await this.validationService.getPinCodeInfo(code)

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("PIN code info error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get PIN code information",
      }

      res.status(400).json(response)
    }
  }

  async getValidationRules(req: Request, res: Response): Promise<void> {
    try {
      const rules = await this.validationService.getAllValidationRules()

      const response: ApiResponse = {
        success: true,
        data: rules,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Get validation rules error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get validation rules",
      }

      res.status(500).json(response)
    }
  }
}
