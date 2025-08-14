"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationService = void 0;
const prisma_1 = require("../lib/prisma");
class RegistrationService {
    async submitStep1(data) {
        const { aadhaarNumber, mobileNumber } = data;
        // Check if registration already exists
        const existingRegistration = await prisma_1.prisma.udyamRegistration.findUnique({
            where: { aadhaarNumber },
        });
        if (existingRegistration) {
            // Update existing registration
            const updated = await prisma_1.prisma.udyamRegistration.update({
                where: { aadhaarNumber },
                data: {
                    mobileNumber,
                    currentStep: 1,
                    updatedAt: new Date(),
                },
            });
            return {
                id: updated.id,
                aadhaarNumber: updated.aadhaarNumber,
                mobileNumber: updated.mobileNumber,
                currentStep: updated.currentStep,
                message: "Step 1 data updated. OTP sent to mobile number.",
                otpSent: true,
            };
        }
        // Create new registration
        const registration = await prisma_1.prisma.udyamRegistration.create({
            data: {
                aadhaarNumber,
                mobileNumber,
                currentStep: 1,
                isAadhaarVerified: false,
            },
        });
        return {
            id: registration.id,
            aadhaarNumber: registration.aadhaarNumber,
            mobileNumber: registration.mobileNumber,
            currentStep: registration.currentStep,
            message: "Step 1 submitted successfully. OTP sent to mobile number.",
            otpSent: true,
        };
    }
    async verifyAadhaarOtp(aadhaarNumber, aadhaarOtp) {
        // In a real application, you would verify the OTP with the actual service
        // For demo purposes, we'll accept any 6-digit OTP
        if (!/^[0-9]{6}$/.test(aadhaarOtp)) {
            throw new Error("Invalid OTP format");
        }
        const registration = await prisma_1.prisma.udyamRegistration.findUnique({
            where: { aadhaarNumber },
        });
        if (!registration) {
            throw new Error("Registration not found");
        }
        // Update registration with OTP verification
        const updated = await prisma_1.prisma.udyamRegistration.update({
            where: { aadhaarNumber },
            data: {
                aadhaarOtp,
                isAadhaarVerified: true,
                currentStep: 2,
                updatedAt: new Date(),
            },
        });
        return {
            id: updated.id,
            aadhaarNumber: updated.aadhaarNumber,
            isAadhaarVerified: updated.isAadhaarVerified,
            currentStep: updated.currentStep,
            message: "Aadhaar verified successfully. Proceed to Step 2.",
        };
    }
    async submitStep2(data) {
        const { aadhaarNumber, panNumber, applicantName, fatherName, dateOfBirth, gender, category, address, pinCode, city, state, district, emailId, } = data;
        // Check if registration exists and Aadhaar is verified
        const existingRegistration = await prisma_1.prisma.udyamRegistration.findUnique({
            where: { aadhaarNumber },
        });
        if (!existingRegistration) {
            throw new Error("Registration not found. Please complete Step 1 first.");
        }
        if (!existingRegistration.isAadhaarVerified) {
            throw new Error("Aadhaar not verified. Please complete Step 1 verification.");
        }
        // Check if PAN is already registered
        if (panNumber) {
            const existingPan = await prisma_1.prisma.udyamRegistration.findFirst({
                where: {
                    panNumber,
                    id: { not: existingRegistration.id },
                },
            });
            if (existingPan) {
                throw new Error("PAN number is already registered with another Aadhaar");
            }
        }
        // Update registration with Step 2 data
        const updated = await prisma_1.prisma.udyamRegistration.update({
            where: { aadhaarNumber },
            data: {
                panNumber,
                isPanVerified: true, // In real app, verify with PAN service
                applicantName,
                fatherName,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                gender,
                category,
                address,
                pinCode,
                city,
                state,
                district,
                emailId,
                currentStep: 2,
                isCompleted: true,
                formData: data, // Store complete form data as JSON
                updatedAt: new Date(),
            },
        });
        return {
            id: updated.id,
            aadhaarNumber: updated.aadhaarNumber,
            panNumber: updated.panNumber,
            applicantName: updated.applicantName,
            currentStep: updated.currentStep,
            isCompleted: updated.isCompleted,
            message: "Registration completed successfully!",
        };
    }
    async getRegistrationByAadhaar(aadhaarNumber) {
        const registration = await prisma_1.prisma.udyamRegistration.findUnique({
            where: { aadhaarNumber },
        });
        if (!registration) {
            return null;
        }
        // Remove sensitive data before returning
        const { aadhaarOtp, ...safeRegistration } = registration;
        return safeRegistration;
    }
    async getAllRegistrations(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [registrations, total] = await Promise.all([
            prisma_1.prisma.udyamRegistration.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    aadhaarNumber: true,
                    panNumber: true,
                    applicantName: true,
                    mobileNumber: true,
                    emailId: true,
                    currentStep: true,
                    isCompleted: true,
                    isAadhaarVerified: true,
                    isPanVerified: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            prisma_1.prisma.udyamRegistration.count(),
        ]);
        return {
            registrations,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async updateRegistration(id, updateData) {
        const registration = await prisma_1.prisma.udyamRegistration.findUnique({
            where: { id },
        });
        if (!registration) {
            throw new Error("Registration not found");
        }
        const updated = await prisma_1.prisma.udyamRegistration.update({
            where: { id },
            data: {
                ...updateData,
                updatedAt: new Date(),
            },
        });
        // Remove sensitive data before returning
        const { aadhaarOtp, ...safeRegistration } = updated;
        return safeRegistration;
    }
    async deleteRegistration(id) {
        const registration = await prisma_1.prisma.udyamRegistration.findUnique({
            where: { id },
        });
        if (!registration) {
            throw new Error("Registration not found");
        }
        await prisma_1.prisma.udyamRegistration.delete({
            where: { id },
        });
        return { message: "Registration deleted successfully" };
    }
}
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=registration-service.js.map