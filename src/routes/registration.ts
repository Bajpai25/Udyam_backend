import express from "express"
import { body } from "express-validator"
import { RegistrationController } from "../controllers/registration-controller"
import { ValidationMiddleware } from "../middleware/validation"

const router = express.Router()
const registrationController = new RegistrationController()

// Step 1: Aadhaar verification
router.post(
  "/step1",
  [
    body("aadhaarNumber")
      .matches(/^[0-9]{12}$/)
      .withMessage("Aadhaar number must be exactly 12 digits"),
    body("mobileNumber")
      .matches(/^[6-9][0-9]{9}$/)
      .withMessage("Mobile number must be 10 digits starting with 6-9"),
    ValidationMiddleware.handleValidationErrors,
  ],
  registrationController.submitStep1.bind(registrationController),
)

// Step 1: OTP verification
router.post(
  "/step1/verify-otp",
  [
    body("aadhaarNumber")
      .matches(/^[0-9]{12}$/)
      .withMessage("Aadhaar number must be exactly 12 digits"),
    body("aadhaarOtp")
      .matches(/^[0-9]{6}$/)
      .withMessage("OTP must be exactly 6 digits"),
    ValidationMiddleware.handleValidationErrors,
  ],
  registrationController.verifyAadhaarOtp.bind(registrationController),
)

// Step 2: PAN verification
router.post(
  "/step2",
  [
    body("aadhaarNumber")
      .matches(/^[0-9]{12}$/)
      .withMessage("Aadhaar number required"),
    body("panNumber")
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
      .withMessage("PAN must be in format: ABCDE1234F"),
    body("applicantName")
      .isLength({ min: 2, max: 100 })
      .withMessage("Applicant name must be between 2 and 100 characters"),
    body("fatherName").isLength({ min: 2, max: 100 }).withMessage("Father's name must be between 2 and 100 characters"),
    body("dateOfBirth").isISO8601().withMessage("Date of birth must be a valid date"),
    body("gender").isIn(["male", "female", "other"]).withMessage("Gender must be male, female, or other"),
    body("category")
      .optional()
      .isIn(["general", "obc", "sc", "st"])
      .withMessage("Category must be general, obc, sc, or st"),
    ValidationMiddleware.handleValidationErrors,
  ],
  registrationController.submitStep2.bind(registrationController),
)

// Get registration status
router.get("/status/:aadhaarNumber", registrationController.getRegistrationStatus.bind(registrationController))

// Get all registrations (admin endpoint)
router.get("/", registrationController.getAllRegistrations.bind(registrationController))

// Update registration
router.put(
  "/:id",
  [
    body("applicantName")
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage("Applicant name must be between 2 and 100 characters"),
    body("fatherName")
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage("Father's name must be between 2 and 100 characters"),
    body("mobileNumber")
      .optional()
      .matches(/^[6-9][0-9]{9}$/)
      .withMessage("Mobile number must be 10 digits starting with 6-9"),
    body("emailId").optional().isEmail().withMessage("Email must be valid"),
    ValidationMiddleware.handleValidationErrors,
  ],
  registrationController.updateRegistration.bind(registrationController),
)

// Delete registration
router.delete("/:id", registrationController.deleteRegistration.bind(registrationController))

export default router
