export declare const validateAadhaar: (aadhaar: string) => {
    isValid: boolean;
    errors: string[];
};
export declare const validatePAN: (pan: string) => {
    isValid: boolean;
    errors: string[];
};
export declare const validateMobile: (mobile: string) => {
    isValid: boolean;
    errors: string[];
};
export declare const validateEmail: (email: string) => {
    isValid: boolean;
    errors: string[];
};
export declare class ValidationService {
    validateAadhaar(aadhaarNumber: string): Promise<{
        aadhaarNumber: string;
        isValidFormat: true;
        isValidChecksum: boolean;
        isValid: boolean;
        message: string;
    }>;
    validatePan(panNumber: string): Promise<{
        panNumber: string;
        isValidFormat: true;
        isAlreadyRegistered: boolean;
        isValid: boolean;
        message: string;
    }>;
    validateMobile(mobileNumber: string): Promise<{
        mobileNumber: string;
        isValidFormat: true;
        isValid: true;
        message: string;
    }>;
    getPinCodeInfo(pinCode: string): Promise<any>;
    getAllValidationRules(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fieldName: string;
        ruleType: string;
        ruleValue: string;
        message: string;
    }[]>;
    private validateAadhaarChecksum;
    private getFallbackPinCodeInfo;
}
//# sourceMappingURL=validation-service.d.ts.map