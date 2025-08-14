import express from "express"
import { FormController } from "../controllers/form-controller"

const router = express.Router()
const formController = new FormController()

// Get form field configuration
router.get("/fields", formController.getFormFields.bind(formController))

// Get form fields for specific step
router.get("/fields/step/:stepNumber", formController.getFormFieldsByStep.bind(formController))

// Update form field configuration (admin endpoint)
router.put("/fields/:id", formController.updateFormField.bind(formController))

// Get form schema (scraped data)
router.get("/schema", formController.getFormSchema.bind(formController))

// Refresh form schema from scraper
router.post("/schema/refresh", formController.refreshFormSchema.bind(formController))

export default router
