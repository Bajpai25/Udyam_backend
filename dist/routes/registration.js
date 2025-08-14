"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const registration_controller_1 = require("../controllers/registration-controller");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
const registrationController = new registration_controller_1.RegistrationController();
// Step 1: Aadhaar verification
router.post("/step1", [
    (0, express_validator_1.body)("aadhaarNumber")
        .matches(/^[0-9]{12}$/)
        .withMessage("Aadhaar number must be exactly 12 digits"),
    (0, express_validator_1.body)("mobileNumber")
        .matches(/^[6-9][0-9]{9}$/)
        .withMessage("Mobile number must be 10 digits starting with 6-9"),
    validation_1.ValidationMiddleware.handleValidationErrors,
], registrationController.submitStep1.bind(registrationController));
// Step 1: OTP verification
router.post("/step1/verify-otp", [
    (0, express_validator_1.body)("aadhaarNumber")
        .matches(/^[0-9]{12}$/)
        .withMessage("Aadhaar number must be exactly 12 digits"),
    (0, express_validator_1.body)("aadhaarOtp")
        .matches(/^[0-9]{6}$/)
        .withMessage("OTP must be exactly 6 digits"),
    validation_1.ValidationMiddleware.handleValidationErrors,
], registrationController.verifyAadhaarOtp.bind(registrationController));
// Step 2: PAN verification
router.post("/step2", [
    (0, express_validator_1.body)("aadhaarNumber")
        .matches(/^[0-9]{12}$/)
        .withMessage("Aadhaar number required"),
    (0, express_validator_1.body)("panNumber")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
        .withMessage("PAN must be in format: ABCDE1234F"),
    (0, express_validator_1.body)("applicantName")
        .isLength({ min: 2, max: 100 })
        .withMessage("Applicant name must be between 2 and 100 characters"),
    (0, express_validator_1.body)("fatherName").isLength({ min: 2, max: 100 }).withMessage("Father's name must be between 2 and 100 characters"),
    (0, express_validator_1.body)("dateOfBirth").isISO8601().withMessage("Date of birth must be a valid date"),
    (0, express_validator_1.body)("gender").isIn(["male", "female", "other"]).withMessage("Gender must be male, female, or other"),
    (0, express_validator_1.body)("category")
        .optional()
        .isIn(["general", "obc", "sc", "st"])
        .withMessage("Category must be general, obc, sc, or st"),
    validation_1.ValidationMiddleware.handleValidationErrors,
], registrationController.submitStep2.bind(registrationController));
// Get registration status
router.get("/status/:aadhaarNumber", registrationController.getRegistrationStatus.bind(registrationController));
// Get all registrations (admin endpoint)
router.get("/", registrationController.getAllRegistrations.bind(registrationController));
// Update registration
router.put("/:id", [
    (0, express_validator_1.body)("applicantName")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("Applicant name must be between 2 and 100 characters"),
    (0, express_validator_1.body)("fatherName")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("Father's name must be between 2 and 100 characters"),
    (0, express_validator_1.body)("mobileNumber")
        .optional()
        .matches(/^[6-9][0-9]{9}$/)
        .withMessage("Mobile number must be 10 digits starting with 6-9"),
    (0, express_validator_1.body)("emailId").optional().isEmail().withMessage("Email must be valid"),
    validation_1.ValidationMiddleware.handleValidationErrors,
], registrationController.updateRegistration.bind(registrationController));
// Delete registration
router.delete("/:id", registrationController.deleteRegistration.bind(registrationController));
exports.default = router;
//# sourceMappingURL=registration.js.map