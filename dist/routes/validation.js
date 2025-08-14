"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validation_controller_1 = require("../controllers/validation-controller");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
const validationController = new validation_controller_1.ValidationController();
// Validate Aadhaar number format
router.post("/aadhaar", [
    (0, express_validator_1.body)("aadhaarNumber")
        .matches(/^[0-9]{12}$/)
        .withMessage("Aadhaar number must be exactly 12 digits"),
    validation_1.ValidationMiddleware.handleValidationErrors,
], validationController.validateAadhaar.bind(validationController));
// Validate PAN number format
router.post("/pan", [
    (0, express_validator_1.body)("panNumber")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
        .withMessage("PAN must be in format: ABCDE1234F"),
    validation_1.ValidationMiddleware.handleValidationErrors,
], validationController.validatePan.bind(validationController));
// Get city/state by PIN code
router.get("/pincode/:code", validationController.getPinCodeInfo.bind(validationController));
// Validate mobile number
router.post("/mobile", [
    (0, express_validator_1.body)("mobileNumber")
        .matches(/^[6-9][0-9]{9}$/)
        .withMessage("Mobile number must be 10 digits starting with 6-9"),
    validation_1.ValidationMiddleware.handleValidationErrors,
], validationController.validateMobile.bind(validationController));
// Get all validation rules
router.get("/rules", validationController.getValidationRules.bind(validationController));
exports.default = router;
//# sourceMappingURL=validation.js.map