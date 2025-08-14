import express from "express"
import { body } from "express-validator"
import { ValidationController } from "../controllers/validation-controller"
import { ValidationMiddleware } from "../middleware/validation"

const router = express.Router()
const validationController = new ValidationController()

// Validate Aadhaar number format
router.post(
  "/aadhaar",
  [
    body("aadhaarNumber")
      .matches(/^[0-9]{12}$/)
      .withMessage("Aadhaar number must be exactly 12 digits"),
    ValidationMiddleware.handleValidationErrors,
  ],
  validationController.validateAadhaar.bind(validationController),
)

// Validate PAN number format
router.post(
  "/pan",
  [
    body("panNumber")
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
      .withMessage("PAN must be in format: ABCDE1234F"),
    ValidationMiddleware.handleValidationErrors,
  ],
  validationController.validatePan.bind(validationController),
)

// Get city/state by PIN code
router.get("/pincode/:code", validationController.getPinCodeInfo.bind(validationController))

// Validate mobile number
router.post(
  "/mobile",
  [
    body("mobileNumber")
      .matches(/^[6-9][0-9]{9}$/)
      .withMessage("Mobile number must be 10 digits starting with 6-9"),
    ValidationMiddleware.handleValidationErrors,
  ],
  validationController.validateMobile.bind(validationController),
)

// Get all validation rules
router.get("/rules", validationController.getValidationRules.bind(validationController))

export default router
