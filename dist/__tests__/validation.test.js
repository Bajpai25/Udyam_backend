"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_service_1 = require("../services/validation-service");
describe("Validation Service", () => {
    describe("validateAadhaar", () => {
        it("should validate correct Aadhaar number", () => {
            const result = (0, validation_service_1.validateAadhaar)("123456789012");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
        it("should reject invalid Aadhaar number", () => {
            const result = (0, validation_service_1.validateAadhaar)("12345");
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain("Aadhaar must be exactly 12 digits");
        });
        it("should reject Aadhaar with non-numeric characters", () => {
            const result = (0, validation_service_1.validateAadhaar)("12345678901a");
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain("Aadhaar must contain only digits");
        });
        it("should reject empty Aadhaar", () => {
            const result = (0, validation_service_1.validateAadhaar)("");
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain("Aadhaar number is required");
        });
    });
    describe("validatePAN", () => {
        it("should validate correct PAN number", () => {
            const result = (0, validation_service_1.validatePAN)("ABCDE1234F");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
        it("should reject invalid PAN format", () => {
            const result = (0, validation_service_1.validatePAN)("INVALID");
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain("PAN must be in format: ABCDE1234F");
        });
        it("should reject PAN with lowercase letters", () => {
            const result = (0, validation_service_1.validatePAN)("abcde1234f");
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain("PAN must be in uppercase");
        });
        it("should reject empty PAN", () => {
            const result = (0, validation_service_1.validatePAN)("");
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain("PAN number is required");
        });
    });
    describe("validateMobile", () => {
        it("should validate correct mobile number", () => {
            const result = (0, validation_service_1.validateMobile)("9876543210");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
        it("should reject invalid mobile number", () => {
            const result = (0, validation_service_1.validateMobile)("123");
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain("Mobile number must be 10 digits");
        });
    });
    describe("validateEmail", () => {
        it("should validate correct email", () => {
            const result = (0, validation_service_1.validateEmail)("test@example.com");
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
        it("should reject invalid email", () => {
            const result = (0, validation_service_1.validateEmail)("invalid-email");
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain("Invalid email format");
        });
    });
});
//# sourceMappingURL=validation.test.js.map