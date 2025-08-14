export interface UdyamFormData {
  // Step 1: Aadhaar
  aadhaarNumber: string
  aadhaarOtp?: string

  // Step 2: PAN
  panNumber: string

  // Personal Details
  applicantName?: string
  fatherName?: string
  dateOfBirth?: string
  gender?: string
  category?: string

  // Address
  address?: string
  pinCode?: string
  city?: string
  state?: string
  district?: string

  // Contact
  mobileNumber?: string
  emailId?: string
}

export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  errors?: ValidationError[]
}

export interface FormFieldConfig {
  fieldName: string
  fieldType: "text" | "select" | "radio" | "checkbox" | "date" | "email" | "tel"
  label: string
  placeholder?: string
  required: boolean
  validation?: {
    pattern?: string
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }
  options?: Array<{ value: string; label: string }>
  step: number
  order: number
}
