import type { Request, Response } from "express"
import { RegistrationService } from "../services/registration-service"
import type { ApiResponse, UdyamFormData } from "../types"

export class RegistrationController {
  private registrationService: RegistrationService

  constructor() {
    this.registrationService = new RegistrationService()
  }

  async submitStep1(req: Request, res: Response): Promise<void> {
    try {
      const { aadhaarNumber, mobileNumber } = req.body

      const result = await this.registrationService.submitStep1({
        aadhaarNumber,
        mobileNumber,
      })

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Step 1 submission error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit step 1",
      }

      res.status(400).json(response)
    }
  }

  async verifyAadhaarOtp(req: Request, res: Response): Promise<void> {
    try {
      const { aadhaarNumber, aadhaarOtp } = req.body

      const result = await this.registrationService.verifyAadhaarOtp(aadhaarNumber, aadhaarOtp)

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("OTP verification error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to verify OTP",
      }

      res.status(400).json(response)
    }
  }

  async submitStep2(req: Request, res: Response): Promise<void> {
    try {
      const formData: UdyamFormData = req.body

      const result = await this.registrationService.submitStep2(formData)

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Step 2 submission error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit step 2",
      }

      res.status(400).json(response)
    }
  }

  async getRegistrationStatus(req: Request, res: Response): Promise<void> {
    try {
      const { aadhaarNumber } = req.params

      const registration = await this.registrationService.getRegistrationByAadhaar(aadhaarNumber)

      if (!registration) {
        const response: ApiResponse = {
          success: false,
          error: "Registration not found",
        }
        res.status(404).json(response)
        return
      }

      const response: ApiResponse = {
        success: true,
        data: registration,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Get registration status error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get registration status",
      }

      res.status(500).json(response)
    }
  }

  async getAllRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.registrationService.getAllRegistrations(page, limit)

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Get all registrations error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get registrations",
      }

      res.status(500).json(response)
    }
  }

  async updateRegistration(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updateData = req.body

      const result = await this.registrationService.updateRegistration(id, updateData)

      const response: ApiResponse = {
        success: true,
        data: result,
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Update registration error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update registration",
      }

      res.status(400).json(response)
    }
  }

  async deleteRegistration(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      await this.registrationService.deleteRegistration(id)

      const response: ApiResponse = {
        success: true,
        data: { message: "Registration deleted successfully" },
      }

      res.status(200).json(response)
    } catch (error) {
      console.error("Delete registration error:", error)

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete registration",
      }

      res.status(400).json(response)
    }
  }
}
