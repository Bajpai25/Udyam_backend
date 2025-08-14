"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registration_service_1 = require("../services/registration-service");
const form_service_1 = require("../services/form-service");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
describe("Services", () => {
    describe("RegistrationService", () => {
        it("should create step 1 registration", async () => {
            const data = {
                aadhaar: "123456789012",
                mobile: "9876543210",
            };
            const result = await registration_service_1.RegistrationService.createStep1(data);
            expect(result.success).toBe(true);
            expect(result.data.sessionId).toBeDefined();
            expect(result.data.step).toBe(1);
        });
        it("should update to step 2", async () => {
            // Create step 1 first
            const step1Result = await registration_service_1.RegistrationService.createStep1({
                aadhaar: "123456789012",
                mobile: "9876543210",
            });
            const sessionId = step1Result.data.sessionId;
            const step2Data = {
                sessionId,
                pan: "ABCDE1234F",
                email: "test@example.com",
            };
            const result = await registration_service_1.RegistrationService.updateStep2(step2Data);
            expect(result.success).toBe(true);
            expect(result.data.step).toBe(2);
            expect(result.data.pan).toBe("ABCDE1234F");
        });
        it("should reject invalid session for step 2", async () => {
            const step2Data = {
                sessionId: "invalid-session",
                pan: "ABCDE1234F",
                email: "test@example.com",
            };
            const result = await registration_service_1.RegistrationService.updateStep2(step2Data);
            expect(result.success).toBe(false);
            expect(result.errors).toContain("Invalid session");
        });
    });
    describe("FormService", () => {
        it("should get all form fields", async () => {
            const result = await form_service_1.FormService.getFormFields();
            expect(result.success).toBe(true);
            expect(Array.isArray(result.data)).toBe(true);
            expect(result.data.length).toBeGreaterThan(0);
        });
        it("should filter fields by step", async () => {
            const result = await form_service_1.FormService.getFormFields(1);
            expect(result.success).toBe(true);
            expect(result.data.every((field) => field.step === 1)).toBe(true);
        });
        it("should get form schema", async () => {
            const result = await form_service_1.FormService.getFormSchema();
            expect(result.success).toBe(true);
            expect(result.data.steps).toBeDefined();
            expect(result.data.validation).toBeDefined();
        });
    });
});
//# sourceMappingURL=services.test.js.map