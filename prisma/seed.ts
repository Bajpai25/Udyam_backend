import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Seed form fields for Step 1
  const step1Fields = [
    {
      fieldName: "aadhaarNumber",
      fieldType: "text",
      label: "Aadhaar Number",
      placeholder: "Enter 12-digit Aadhaar number",
      required: true,
      validation: {
        pattern: "^[0-9]{12}$",
        minLength: 12,
        maxLength: 12,
        message: "Aadhaar number must be exactly 12 digits",
      },
      step: 1,
      order: 1,
    },
    {
      fieldName: "mobileNumber",
      fieldType: "tel",
      label: "Mobile Number",
      placeholder: "Enter 10-digit mobile number",
      required: true,
      validation: {
        pattern: "^[6-9][0-9]{9}$",
        minLength: 10,
        maxLength: 10,
        message: "Mobile number must be 10 digits starting with 6-9",
      },
      step: 1,
      order: 2,
    },
    {
      fieldName: "aadhaarOtp",
      fieldType: "text",
      label: "OTP",
      placeholder: "Enter 6-digit OTP",
      required: true,
      validation: {
        pattern: "^[0-9]{6}$",
        minLength: 6,
        maxLength: 6,
        message: "OTP must be exactly 6 digits",
      },
      step: 1,
      order: 3,
    },
  ]

  // Seed form fields for Step 2
  const step2Fields = [
    {
      fieldName: "panNumber",
      fieldType: "text",
      label: "PAN Number",
      placeholder: "Enter PAN number (e.g., ABCDE1234F)",
      required: true,
      validation: {
        pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
        minLength: 10,
        maxLength: 10,
        message: "PAN must be in format: ABCDE1234F",
      },
      step: 2,
      order: 1,
    },
    {
      fieldName: "applicantName",
      fieldType: "text",
      label: "Applicant Name",
      placeholder: "Enter full name as per PAN",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100,
        message: "Name must be between 2 and 100 characters",
      },
      step: 2,
      order: 2,
    },
    {
      fieldName: "fatherName",
      fieldType: "text",
      label: "Father's Name",
      placeholder: "Enter father's name",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100,
        message: "Father's name must be between 2 and 100 characters",
      },
      step: 2,
      order: 3,
    },
    {
      fieldName: "dateOfBirth",
      fieldType: "date",
      label: "Date of Birth",
      placeholder: "Select date of birth",
      required: true,
      validation: {
        message: "Please enter a valid date of birth",
      },
      step: 2,
      order: 4,
    },
    {
      fieldName: "gender",
      fieldType: "radio",
      label: "Gender",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      step: 2,
      order: 5,
    },
    {
      fieldName: "category",
      fieldType: "select",
      label: "Category",
      required: false,
      options: [
        { value: "general", label: "General" },
        { value: "obc", label: "OBC" },
        { value: "sc", label: "SC" },
        { value: "st", label: "ST" },
      ],
      step: 2,
      order: 6,
    },
  ]

  // Create form fields
  for (const field of [...step1Fields, ...step2Fields]) {
    await prisma.formField.upsert({
      where: { fieldName: field.fieldName },
      update: field,
      create: field,
    })
  }

  // Seed validation rules
  const validationRules = [
    {
      fieldName: "aadhaarNumber",
      ruleType: "regex",
      ruleValue: "^[0-9]{12}$",
      message: "Aadhaar number must be exactly 12 digits",
    },
    {
      fieldName: "panNumber",
      ruleType: "regex",
      ruleValue: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
      message: "PAN must be in format: ABCDE1234F (5 letters, 4 numbers, 1 letter)",
    },
    {
      fieldName: "mobileNumber",
      ruleType: "regex",
      ruleValue: "^[6-9][0-9]{9}$",
      message: "Mobile number must be 10 digits starting with 6, 7, 8, or 9",
    },
    {
      fieldName: "aadhaarOtp",
      ruleType: "regex",
      ruleValue: "^[0-9]{6}$",
      message: "OTP must be exactly 6 digits",
    },
    {
      fieldName: "pinCode",
      ruleType: "regex",
      ruleValue: "^[0-9]{6}$",
      message: "PIN code must be exactly 6 digits",
    },
  ]

  for (const rule of validationRules) {
    await prisma.validationRule.upsert({
      where: {
        fieldName_ruleType: {
          fieldName: rule.fieldName,
          ruleType: rule.ruleType,
        },
      },
      update: rule,
      create: rule,
    })
  }

  console.log("✅ Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
