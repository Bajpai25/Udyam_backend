-- CreateTable
CREATE TABLE "udyam_registrations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "aadhaarNumber" TEXT NOT NULL,
    "isAadhaarVerified" BOOLEAN NOT NULL DEFAULT false,
    "aadhaarOtp" TEXT,
    "panNumber" TEXT,
    "isPanVerified" BOOLEAN NOT NULL DEFAULT false,
    "applicantName" TEXT,
    "fatherName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "category" TEXT,
    "address" TEXT,
    "pinCode" TEXT,
    "city" TEXT,
    "state" TEXT,
    "district" TEXT,
    "mobileNumber" TEXT,
    "emailId" TEXT,
    "enterpriseName" TEXT,
    "enterpriseType" TEXT,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "formData" JSONB,

    CONSTRAINT "udyam_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_fields" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fieldName" TEXT NOT NULL,
    "fieldType" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "placeholder" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "validation" JSONB,
    "options" JSONB,
    "step" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "form_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validation_rules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fieldName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "ruleValue" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "validation_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "udyam_registrations_aadhaarNumber_key" ON "udyam_registrations"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "udyam_registrations_panNumber_key" ON "udyam_registrations"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "form_fields_fieldName_key" ON "form_fields"("fieldName");
