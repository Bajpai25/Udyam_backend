"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const form_controller_1 = require("../controllers/form-controller");
const router = express_1.default.Router();
const formController = new form_controller_1.FormController();
// Get form field configuration
router.get("/fields", formController.getFormFields.bind(formController));
// Get form fields for specific step
router.get("/fields/step/:stepNumber", formController.getFormFieldsByStep.bind(formController));
// Update form field configuration (admin endpoint)
router.put("/fields/:id", formController.updateFormField.bind(formController));
// Get form schema (scraped data)
router.get("/schema", formController.getFormSchema.bind(formController));
// Refresh form schema from scraper
router.post("/schema/refresh", formController.refreshFormSchema.bind(formController));
exports.default = router;
//# sourceMappingURL=form.js.map