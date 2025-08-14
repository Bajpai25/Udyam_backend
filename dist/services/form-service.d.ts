export declare class FormService {
    private scraperOutputPath;
    getAllFormFields(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fieldName: string;
        fieldType: string;
        label: string;
        placeholder: string | null;
        required: boolean;
        validation: import("@prisma/client/runtime/library").JsonValue | null;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        step: number;
        order: number;
    }[]>;
    getFormFieldsByStep(step: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fieldName: string;
        fieldType: string;
        label: string;
        placeholder: string | null;
        required: boolean;
        validation: import("@prisma/client/runtime/library").JsonValue | null;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        step: number;
        order: number;
    }[]>;
    updateFormField(id: string, updateData: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fieldName: string;
        fieldType: string;
        label: string;
        placeholder: string | null;
        required: boolean;
        validation: import("@prisma/client/runtime/library").JsonValue | null;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        step: number;
        order: number;
    }>;
    getFormSchema(): Promise<any>;
    refreshFormSchema(): Promise<any>;
    private updateDatabaseFromSchema;
}
//# sourceMappingURL=form-service.d.ts.map