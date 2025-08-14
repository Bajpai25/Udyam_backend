import type { Request, Response } from "express";
export declare class FormController {
    private formService;
    constructor();
    getFormFields(req: Request, res: Response): Promise<void>;
    getFormFieldsByStep(req: Request, res: Response): Promise<void>;
    updateFormField(req: Request, res: Response): Promise<void>;
    getFormSchema(req: Request, res: Response): Promise<void>;
    refreshFormSchema(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=form-controller.d.ts.map