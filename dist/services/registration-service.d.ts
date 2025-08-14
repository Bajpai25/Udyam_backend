import type { UdyamFormData } from "../types";
export declare class RegistrationService {
    submitStep1(data: {
        aadhaarNumber: string;
        mobileNumber: string;
    }): Promise<{
        id: string;
        aadhaarNumber: string;
        mobileNumber: string | null;
        currentStep: number;
        message: string;
        otpSent: boolean;
    }>;
    verifyAadhaarOtp(aadhaarNumber: string, aadhaarOtp: string): Promise<{
        id: string;
        aadhaarNumber: string;
        isAadhaarVerified: boolean;
        currentStep: number;
        message: string;
    }>;
    submitStep2(data: UdyamFormData): Promise<{
        id: string;
        aadhaarNumber: string;
        panNumber: string | null;
        applicantName: string | null;
        currentStep: number;
        isCompleted: boolean;
        message: string;
    }>;
    getRegistrationByAadhaar(aadhaarNumber: string): Promise<{
        aadhaarNumber: string;
        mobileNumber: string | null;
        id: string;
        panNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
        isAadhaarVerified: boolean;
        isPanVerified: boolean;
        applicantName: string | null;
        fatherName: string | null;
        dateOfBirth: Date | null;
        gender: string | null;
        category: string | null;
        address: string | null;
        pinCode: string | null;
        city: string | null;
        state: string | null;
        district: string | null;
        emailId: string | null;
        enterpriseName: string | null;
        enterpriseType: string | null;
        currentStep: number;
        isCompleted: boolean;
        formData: import("@prisma/client/runtime/library").JsonValue | null;
    } | null>;
    getAllRegistrations(page?: number, limit?: number): Promise<{
        registrations: {
            aadhaarNumber: string;
            mobileNumber: string | null;
            id: string;
            panNumber: string | null;
            createdAt: Date;
            updatedAt: Date;
            isAadhaarVerified: boolean;
            isPanVerified: boolean;
            applicantName: string | null;
            emailId: string | null;
            currentStep: number;
            isCompleted: boolean;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    updateRegistration(id: string, updateData: Partial<UdyamFormData>): Promise<{
        aadhaarNumber: string;
        mobileNumber: string | null;
        id: string;
        panNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
        isAadhaarVerified: boolean;
        isPanVerified: boolean;
        applicantName: string | null;
        fatherName: string | null;
        dateOfBirth: Date | null;
        gender: string | null;
        category: string | null;
        address: string | null;
        pinCode: string | null;
        city: string | null;
        state: string | null;
        district: string | null;
        emailId: string | null;
        enterpriseName: string | null;
        enterpriseType: string | null;
        currentStep: number;
        isCompleted: boolean;
        formData: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    deleteRegistration(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=registration-service.d.ts.map