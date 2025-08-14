"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = exports.validateEmail = exports.validateMobile = exports.validatePAN = exports.validateAadhaar = void 0;
const prisma_1 = require("../lib/prisma");
const axios_1 = __importDefault(require("axios"));
const validateAadhaar = (aadhaar) => {
    if (!aadhaar || aadhaar.trim() === "") {
        return {
            isValid: false,
            errors: ["Aadhaar number is required"],
        };
    }
    const cleanAadhaar = aadhaar.replace(/\s/g, "");
    if (cleanAadhaar.length !== 12) {
        return {
            isValid: false,
            errors: ["Aadhaar must be exactly 12 digits"],
        };
    }
    if (!/^\d+$/.test(cleanAadhaar)) {
        return {
            isValid: false,
            errors: ["Aadhaar must contain only digits"],
        };
    }
    return {
        isValid: true,
        errors: [],
    };
};
exports.validateAadhaar = validateAadhaar;
const validatePAN = (pan) => {
    if (!pan || pan.trim() === "") {
        return {
            isValid: false,
            errors: ["PAN number is required"],
        };
    }
    const cleanPAN = pan.trim();
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPAN)) {
        return {
            isValid: false,
            errors: ["PAN must be in format: ABCDE1234F"],
        };
    }
    if (cleanPAN !== cleanPAN.toUpperCase()) {
        return {
            isValid: false,
            errors: ["PAN must be in uppercase"],
        };
    }
    return {
        isValid: true,
        errors: [],
    };
};
exports.validatePAN = validatePAN;
const validateMobile = (mobile) => {
    if (!mobile || mobile.trim() === "") {
        return {
            isValid: false,
            errors: ["Mobile number is required"],
        };
    }
    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length !== 10) {
        return {
            isValid: false,
            errors: ["Mobile number must be 10 digits"],
        };
    }
    if (!/^[6-9]/.test(cleanMobile)) {
        return {
            isValid: false,
            errors: ["Mobile number must start with 6, 7, 8, or 9"],
        };
    }
    return {
        isValid: true,
        errors: [],
    };
};
exports.validateMobile = validateMobile;
const validateEmail = (email) => {
    if (!email || email.trim() === "") {
        return {
            isValid: false,
            errors: ["Email address is required"],
        };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            errors: ["Invalid email format"],
        };
    }
    if (email.length > 254) {
        return {
            isValid: false,
            errors: ["Email address is too long"],
        };
    }
    return {
        isValid: true,
        errors: [],
    };
};
exports.validateEmail = validateEmail;
class ValidationService {
    async validateAadhaar(aadhaarNumber) {
        // Basic format validation
        const aadhaarRegex = /^[0-9]{12}$/;
        const isValidFormat = aadhaarRegex.test(aadhaarNumber);
        if (!isValidFormat) {
            throw new Error("Invalid Aadhaar number format");
        }
        // Additional validation: Verhoeff algorithm (simplified)
        const isValidChecksum = this.validateAadhaarChecksum(aadhaarNumber);
        return {
            aadhaarNumber,
            isValidFormat,
            isValidChecksum,
            isValid: isValidFormat && isValidChecksum,
            message: isValidFormat && isValidChecksum ? "Valid Aadhaar number" : "Invalid Aadhaar number",
        };
    }
    async validatePan(panNumber) {
        // PAN format validation
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        const isValidFormat = panRegex.test(panNumber);
        if (!isValidFormat) {
            throw new Error("Invalid PAN number format");
        }
        // Check if PAN is already registered
        const existingPan = await prisma_1.prisma.udyamRegistration.findFirst({
            where: { panNumber },
        });
        return {
            panNumber,
            isValidFormat,
            isAlreadyRegistered: !!existingPan,
            isValid: isValidFormat && !existingPan,
            message: isValidFormat
                ? existingPan
                    ? "PAN number is already registered"
                    : "Valid PAN number"
                : "Invalid PAN number format",
        };
    }
    async validateMobile(mobileNumber) {
        // Mobile number format validation
        const mobileRegex = /^[6-9][0-9]{9}$/;
        const isValidFormat = mobileRegex.test(mobileNumber);
        if (!isValidFormat) {
            throw new Error("Invalid mobile number format");
        }
        return {
            mobileNumber,
            isValidFormat,
            isValid: isValidFormat,
            message: isValidFormat ? "Valid mobile number" : "Invalid mobile number format",
        };
    }
    async getPinCodeInfo(pinCode) {
        // PIN code format validation
        const pinRegex = /^[0-9]{6}$/;
        const isValidFormat = pinRegex.test(pinCode);
        if (!isValidFormat) {
            throw new Error("Invalid PIN code format");
        }
        try {
            // Try to get PIN code info from external API
            // Using a free PIN code API (replace with actual service)
            const response = await axios_1.default.get(`https://api.postalpincode.in/pincode/${pinCode}`, {
                timeout: 5000,
            });
            if (response.data && response.data[0] && response.data[0].Status === "Success") {
                const postOffice = response.data[0].PostOffice[0];
                return {
                    pinCode,
                    isValid: true,
                    city: postOffice.Name,
                    district: postOffice.District,
                    state: postOffice.State,
                    country: postOffice.Country,
                    message: "PIN code information retrieved successfully",
                };
            }
            // Fallback data for common PIN codes
            return this.getFallbackPinCodeInfo(pinCode);
        }
        catch (error) {
            console.warn("PIN code API error:", error);
            return this.getFallbackPinCodeInfo(pinCode);
        }
    }
    async getAllValidationRules() {
        const rules = await prisma_1.prisma.validationRule.findMany({
            orderBy: { fieldName: "asc" },
        });
        return rules;
    }
    validateAadhaarChecksum(aadhaarNumber) {
        // Simplified Verhoeff algorithm validation
        // In a real application, implement the full Verhoeff algorithm
        const digits = aadhaarNumber.split("").map(Number);
        const checksum = digits.pop();
        // Simple checksum validation (not the actual Verhoeff algorithm)
        const sum = digits.reduce((acc, digit, index) => acc + digit * (index + 1), 0);
        const calculatedChecksum = sum % 10;
        return calculatedChecksum === checksum;
    }
    getFallbackPinCodeInfo(pinCode) {
        // Fallback data for common PIN codes
        const fallbackData = {
            "110001": {
                city: "New Delhi",
                district: "Central Delhi",
                state: "Delhi",
                country: "India",
            },
            "400001": {
                city: "Mumbai",
                district: "Mumbai",
                state: "Maharashtra",
                country: "India",
            },
            "560001": {
                city: "Bangalore",
                district: "Bangalore Urban",
                state: "Karnataka",
                country: "India",
            },
            "600001": {
                city: "Chennai",
                district: "Chennai",
                state: "Tamil Nadu",
                country: "India",
            },
            "700001": {
                city: "Kolkata",
                district: "Kolkata",
                state: "West Bengal",
                country: "India",
            },
        };
        const info = fallbackData[pinCode];
        if (info) {
            return {
                pinCode,
                isValid: true,
                ...info,
                message: "PIN code information retrieved from fallback data",
            };
        }
        return {
            pinCode,
            isValid: true,
            city: "Unknown",
            district: "Unknown",
            state: "Unknown",
            country: "India",
            message: "PIN code format is valid but location information not available",
        };
    }
}
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation-service.js.map