import type { Request, Response } from "express";
export declare class ValidationController {
    private validationService;
    constructor();
    validateAadhaar(req: Request, res: Response): Promise<void>;
    validatePan(req: Request, res: Response): Promise<void>;
    validateMobile(req: Request, res: Response): Promise<void>;
    getPinCodeInfo(req: Request, res: Response): Promise<void>;
    getValidationRules(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=validation-controller.d.ts.map