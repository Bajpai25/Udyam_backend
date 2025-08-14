import type { Request, Response } from "express";
export declare class RegistrationController {
    private registrationService;
    constructor();
    submitStep1(req: Request, res: Response): Promise<void>;
    verifyAadhaarOtp(req: Request, res: Response): Promise<void>;
    submitStep2(req: Request, res: Response): Promise<void>;
    getRegistrationStatus(req: Request, res: Response): Promise<void>;
    getAllRegistrations(req: Request, res: Response): Promise<void>;
    updateRegistration(req: Request, res: Response): Promise<void>;
    deleteRegistration(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=registration-controller.d.ts.map