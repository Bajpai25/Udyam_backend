# Udyam Registration Backend

A robust Node.js backend API that handles Udyam registration form processing with PostgreSQL database, Prisma ORM, and comprehensive validation.

## 🚀 Tech Stack

- **Node.js** with TypeScript
- **Express.js** web framework
- **Prisma ORM** with PostgreSQL
- **JWT** for authentication
- **Zod** for validation
- **Jest** for testing
- **Docker** for containerization

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Bajpai25/Udyam_backend
   cd src
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update `.env` with your configuration:
   \`\`\`env
   DATABASE_URL="postgresql://username:password@localhost:5432/udyam_db"
   JWT_SECRET="your-super-secret-jwt-key"
   NODE_ENV="development"
   PORT=3001
   FRONTEND_URL="http://localhost:3000"
   \`\`\`

4. **Database Setup**
   \`\`\`bash
   # Create database
   createdb udyam_db
   
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # Seed database (optional)
   npm run seed
   \`\`\`

## 🚀 Development

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Database operations
npx prisma studio          # Open Prisma Studio
npx prisma db push         # Push schema changes
npx prisma generate        # Generate Prisma client
\`\`\`

## 📡 API Endpoints

### Registration
- `POST /api/registration/step1` - Submit Aadhaar verification
- `POST /api/registration/step1/verify-otp` - Verify OTP
- `POST /api/registration/step2` - Submit PAN details
- `GET /api/registration/status/:aadhaar` - Check registration status

### Form Configuration
- `GET /api/form/fields` - Get all form fields
- `GET /api/form/fields/:step` - Get fields by step
- `GET /api/form/schema` - Get form schema

### Validation
- `POST /api/validation/aadhaar` - Validate Aadhaar format
- `POST /api/validation/pan` - Validate PAN format
- `POST /api/validation/mobile` - Validate mobile number

### Health Check
- `GET /api/health` - API health status

## 🏗️ Project Structure

\`\`\`
src/
├── controllers/        # Request handlers
│   ├── registration-controller.ts
│   ├── form-controller.ts
│   └── validation-controller.ts
├── services/          # Business logic layer
│   ├── registration-service.ts
│   ├── form-service.ts
│   └── validation-service.ts
├── routes/            # API route definitions
├── middleware/        # Custom middleware
├── utils/            # Utility functions
├── __tests__/        # Test files
└── index.ts          # Application entry point
\`\`\`

## 🗄️ Database Schema

### UdyamRegistration
- `id` - Unique identifier
- `aadhaarNumber` - Aadhaar number (unique)
- `panNumber` - PAN number (optional, unique)
- `mobileNumber` - Mobile number
- `currentStep` - Registration progress
- `isAadhaarVerified` - Verification status
- `formData` - JSON form data
- `status` - Registration status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### FormField
- `id` - Unique identifier
- `name` - Field name
- `label` - Display label
- `type` - Input type
- `step` - Form step number
- `required` - Required flag
- `order` - Display order

### ValidationRule
- `id` - Unique identifier
- `fieldName` - Target field
- `ruleType` - Validation type
- `pattern` - Regex pattern
- `message` - Error message

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port | No (default: 3001) |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## 🧪 Testing

\`\`\`bash
# Run all tests
npm run test

# Run specific test file
npm run test -- validation.test.ts

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
\`\`\`

### Test Categories
- **Unit Tests**: Service layer business logic
- **Integration Tests**: API endpoint testing
- **Validation Tests**: Input validation rules

## 🚀 Deployment

### Docker
\`\`\`bash
# Build image
docker build -t udyam-backend .

# Run container
docker run -p 3001:3001 --env-file .env udyam-backend
\`\`\`

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Render
1. Create new Web Service
2. Set Dockerfile path: `./backend/Dockerfile`
3. Add environment variables
4. Deploy

## 🔒 Security Features

- **Input Validation**: Comprehensive Zod schemas
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **CORS Configuration**: Configurable origin whitelist
- **Rate Limiting**: API request throttling
- **Helmet**: Security headers middleware
- **Environment Variables**: Sensitive data protection

## 📊 Monitoring & Logging

- **Health Checks**: `/api/health` endpoint
- **Error Handling**: Centralized error middleware
- **Request Logging**: Morgan HTTP request logger
- **Database Monitoring**: Prisma query logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
