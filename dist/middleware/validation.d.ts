import type { Request, Response, NextFunction } from "express";
export declare class ValidationMiddleware {
    static handleValidationErrors(req: Request, res: Response, next: NextFunction): void;
    static validateUniqueAadhaar(req: Request, res: Response, next: NextFunction): Promise<void>;
    static validateUniquePan(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=validation.d.ts.map