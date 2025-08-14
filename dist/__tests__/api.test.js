"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
describe("API Endpoints", () => {
    describe("POST /api/registration/step1", () => {
        it("should accept valid step 1 data", async () => {
            const response = await (0, supertest_1.default)(index_1.app).post("/api/registration/step1").send({
                aadhaar: "123456789012",
                mobile: "9876543210",
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.sessionId).toBeDefined();
        });
        it("should reject invalid Aadhaar", async () => {
            const response = await (0, supertest_1.default)(index_1.app).post("/api/registration/step1").send({
                aadhaar: "12345",
                mobile: "9876543210",
            });
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.errors).toContain("Aadhaar must be exactly 12 digits");
        });
        it("should reject missing required fields", async () => {
            const response = await (0, supertest_1.default)(index_1.app).post("/api/registration/step1").send({});
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.errors).toContain("Aadhaar number is required");
        });
    });
    describe("POST /api/registration/step2", () => {
        let sessionId;
        beforeEach(async () => {
            // Create a session first
            const step1Response = await (0, supertest_1.default)(index_1.app).post("/api/registration/step1").send({
                aadhaar: "123456789012",
                mobile: "9876543210",
            });
            sessionId = step1Response.body.data.sessionId;
        });
        it("should accept valid step 2 data", async () => {
            const response = await (0, supertest_1.default)(index_1.app).post("/api/registration/step2").send({
                sessionId,
                pan: "ABCDE1234F",
                email: "test@example.com",
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
        it("should reject invalid PAN", async () => {
            const response = await (0, supertest_1.default)(index_1.app).post("/api/registration/step2").send({
                sessionId,
                pan: "INVALID",
                email: "test@example.com",
            });
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.errors).toContain("PAN must be in format: ABCDE1234F");
        });
        it("should reject invalid session", async () => {
            const response = await (0, supertest_1.default)(index_1.app).post("/api/registration/step2").send({
                sessionId: "invalid-session",
                pan: "ABCDE1234F",
                email: "test@example.com",
            });
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.errors).toContain("Invalid session");
        });
    });
    describe("GET /api/form/fields", () => {
        it("should return form fields", async () => {
            const response = await (0, supertest_1.default)(index_1.app).get("/api/form/fields");
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
        it("should filter fields by step", async () => {
            const response = await (0, supertest_1.default)(index_1.app).get("/api/form/fields?step=1");
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.every((field) => field.step === 1)).toBe(true);
        });
    });
    describe("POST /api/validation/validate-field", () => {
        it("should validate individual field", async () => {
            const response = await (0, supertest_1.default)(index_1.app).post("/api/validation/validate-field").send({
                fieldName: "aadhaar",
                value: "123456789012",
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.isValid).toBe(true);
        });
        it("should return validation errors", async () => {
            const response = await (0, supertest_1.default)(index_1.app).post("/api/validation/validate-field").send({
                fieldName: "aadhaar",
                value: "12345",
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.isValid).toBe(false);
            expect(response.body.data.errors.length).toBeGreaterThan(0);
        });
    });
});
//# sourceMappingURL=api.test.js.map