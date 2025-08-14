"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const child_process_1 = require("child_process");
const globals_1 = require("@jest/globals");
const prisma = new client_1.PrismaClient();
(0, globals_1.beforeAll)(async () => {
    // Setup test database
    process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || "postgresql://test:test@localhost:5432/udyam_test";
    // Run migrations
    (0, child_process_1.execSync)("npx prisma migrate deploy", { stdio: "inherit" });
    // Seed test data
    await prisma.formField.createMany({
        data: [
            {
                name: "aadhaar",
                label: "Aadhaar Number",
                type: "text",
                required: true,
                validation: JSON.stringify({
                    pattern: "^[0-9]{12}$",
                    message: "Aadhaar must be 12 digits",
                }),
                step: 1,
            },
            {
                name: "pan",
                label: "PAN Number",
                type: "text",
                required: true,
                validation: JSON.stringify({
                    pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
                    message: "Invalid PAN format",
                }),
                step: 2,
            },
        ],
    });
});
(0, globals_1.afterAll)(async () => {
    // Clean up test data
    await prisma.registration.deleteMany();
    await prisma.formField.deleteMany();
    await prisma.$disconnect();
});
(0, globals_1.afterEach)(async () => {
    // Clean up between tests
    await prisma.registration.deleteMany();
});
//# sourceMappingURL=setup.js.map