# HomeGuru Backend

GraphQL API backend for HomeGuru platform built with Node.js, AWS Lambda, and DynamoDB.

## 🏗️ Architecture

- **API:** GraphQL with Apollo Server
- **Runtime:** AWS Lambda (Serverless)
- **Database:** DynamoDB
- **Authentication:** JWT
- **SMS:** Twilio (OTP verification)
- **Email:** Nodemailer
- **Payments:** Razorpay

## 📁 Project Structure

```
backend/
├── src/
│   ├── graphql/
│   │   ├── resolvers/          # GraphQL resolvers
│   │   │   ├── auth.js         # Authentication
│   │   │   ├── student.js      # Student operations
│   │   │   ├── tutor.js        # Tutor operations
│   │   │   ├── session.js      # Session management
│   │   │   ├── booking.js      # Booking operations
│   │   │   ├── message.js      # Messaging
│   │   │   ├── payment.js      # Payments
│   │   │   ├── assignment.js   # Assignments
│   │   │   ├── note.js         # Notes
│   │   │   └── index.js        # Resolver aggregator
│   │   └── schema.js           # GraphQL schema
│   ├── models/                 # DynamoDB models
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Tutor.js
│   │   └── index.js
│   ├── services/               # External services
│   │   ├── sms.js              # Twilio SMS
│   │   └── email.js            # Email service
│   ├── middleware/             # Middleware
│   │   └── auth.js             # JWT authentication
│   └── index.js                # Lambda handler
├── serverless.yml              # Serverless config
├── package.json
└── .env.example
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- AWS Account
- AWS CLI configured
- Twilio Account (for SMS)
- Email service (Gmail/SendGrid)
- Razorpay Account

### Installation

1. **Clone and navigate:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   - JWT_SECRET
   - TWILIO credentials
   - Email credentials
   - Razorpay keys

4. **Run locally:**
   ```bash
   npm run dev
   ```
   
   GraphQL Playground: http://localhost:3000/dev/graphql

### Deployment

1. **Deploy to AWS:**
   ```bash
   npm run deploy:dev    # Development
   npm run deploy:prod   # Production
   ```

2. **Note your API endpoint:**
   ```
   https://xxxxxx.execute-api.us-east-1.amazonaws.com/dev/graphql
   ```

## 📊 Database Schema

### DynamoDB Tables

#### Users Table
- **Primary Key:** id (String)
- **GSI:** EmailIndex (email), PhoneIndex (phone)
- **Attributes:** email, phone, countryCode, password, role, isEmailVerified, isPhoneVerified

#### Students Table
- **Primary Key:** id (String)
- **GSI:** UserIdIndex (userId)
- **Attributes:** userId, name, dateOfBirth, gender, category, location, board, grade, xp, streak

#### Tutors Table
- **Primary Key:** id (String)
- **GSI:** UserIdIndex (userId)
- **Attributes:** userId, name, bio, subjects, languages, pricing, rating, isVerified

#### Sessions Table
- **Primary Key:** id (String)
- **GSI:** TutorIdIndex (tutorId, scheduledAt), StudentIdIndex (studentId, scheduledAt)
- **Attributes:** tutorId, studentId, subject, scheduledAt, duration, status

#### Bookings Table
- **Primary Key:** id (String)
- **GSI:** StudentIdIndex (studentId), TutorIdIndex (tutorId)
- **Attributes:** studentId, tutorId, subject, message, status

#### Messages Table
- **Primary Key:** id (String)
- **GSI:** ThreadIdIndex (threadId, createdAt)
- **Attributes:** threadId, senderId, content, isRead

#### Payments Table
- **Primary Key:** id (String)
- **GSI:** UserIdIndex (userId, createdAt)
- **Attributes:** userId, amount, status, razorpayOrderId, razorpayPaymentId

#### Assignments Table
- **Primary Key:** id (String)
- **GSI:** StudentIdIndex (studentId), TutorIdIndex (tutorId)
- **Attributes:** tutorId, studentId, title, description, dueDate, status

#### Notes Table
- **Primary Key:** id (String)
- **GSI:** SessionIdIndex (sessionId)
- **Attributes:** sessionId, title, content, attachments

## 🔐 Authentication

### Signup Flow

```graphql
mutation Signup {
  signup(input: {
    email: "user@example.com"
    phone: "1234567890"
    countryCode: "+91"
    password: "password123"
    role: STUDENT
  }) {
    token
    user {
      id
      email
      role
    }
  }
}
```

### Login Flow

```graphql
mutation Login {
  login(
    email: "user@example.com"
    password: "password123"
  ) {
    token
    user {
      id
      email
      role
    }
  }
}
```

### OTP Verification

```graphql
# Send OTP
mutation SendOTP {
  sendOTP(phone: "1234567890", countryCode: "+91") {
    success
    message
    expiresAt
  }
}

# Verify OTP
mutation VerifyOTP {
  verifyOTP(
    phone: "1234567890"
    countryCode: "+91"
    otp: "123456"
  ) {
    success
    message
  }
}
```

### Email Verification

```graphql
# Send verification email
mutation SendEmailVerification {
  sendEmailVerification(email: "user@example.com") {
    success
    message
  }
}

# Verify email with token
mutation VerifyEmail {
  verifyEmail(token: "jwt-token-here") {
    success
    message
  }
}
```

## 📱 Student Onboarding

```graphql
mutation CompleteOnboarding {
  completeStudentOnboarding(input: {
    name: "John Doe"
    dateOfBirth: "2005-01-15"
    gender: MALE
    category: STUDENT
    location: "Mumbai, India"
    heardFrom: "Instagram"
    interest: "Academic"
    subject: "Mathematics"
    knowledgeLevel: "I know some basics"
    board: "CBSE"
    grade: "Grade 11"
  }) {
    id
    name
    category
    board
    grade
  }
}
```

## 👨‍🏫 Tutor Onboarding

```graphql
mutation CompleteTutorOnboarding {
  completeTutorOnboarding(input: {
    name: "Jane Smith"
    bio: "Mathematics expert with 5+ years experience"
    location: "Delhi, India"
    subjects: ["Mathematics", "Physics"]
    languages: ["English", "Hindi"]
    pricing: {
      Mathematics: 500
      Physics: 500
    }
    experience: [
      {
        title: "Senior Tutor"
        organization: "HomeGuru"
        period: "2020 - Present"
      }
    ]
    education: [
      {
        degree: "B.Sc Mathematics"
        institution: "Delhi University"
        period: "2015 - 2018"
      }
    ]
  }) {
    id
    name
    subjects
    rating
  }
}
```

## 🔍 Search Tutors

```graphql
query SearchTutors {
  searchTutors(
    subject: "Mathematics"
    minRating: 4.0
    maxPrice: 1000
    location: "Mumbai"
    limit: 10
  ) {
    id
    name
    bio
    subjects
    rating
    pricing
  }
}
```

## 📅 Session Management

```graphql
# Schedule session
mutation ScheduleSession {
  scheduleSession(input: {
    tutorId: "tutor-id"
    studentId: "student-id"
    subject: "Mathematics"
    scheduledAt: "2024-01-20T10:00:00Z"
    duration: 60
  }) {
    id
    subject
    scheduledAt
    status
  }
}

# Get my sessions
query MySessions {
  mySessions(status: SCHEDULED, limit: 10) {
    id
    subject
    scheduledAt
    duration
    tutor {
      name
    }
    student {
      name
    }
  }
}
```

## 💰 Payment Integration

```graphql
# Create payment order
mutation CreatePayment {
  createPaymentOrder(
    amount: 500
    description: "Session payment"
  ) {
    id
    amount
    razorpayOrderId
    status
  }
}

# Verify payment
mutation VerifyPayment {
  verifyPayment(
    paymentId: "pay_xxx"
    orderId: "order_xxx"
    signature: "signature_xxx"
  ) {
    id
    status
  }
}

# Get wallet
query MyWallet {
  myWallet {
    balance
    totalEarned
    totalSpent
    pendingPayout
  }
}
```

## 📊 Analytics

```graphql
# Student analytics
query StudentAnalytics {
  myStudentAnalytics {
    totalSessions
    hoursLearned
    assignmentsCompleted
    assignmentsPending
    averageScore
    streak
    xp
    weeklyProgress {
      week
      sessions
      hours
      score
    }
  }
}

# Tutor analytics
query TutorAnalytics {
  myTutorAnalytics {
    totalEarnings
    thisMonthEarnings
    thisWeekEarnings
    totalSessions
    activeStudents
    rating
    weeklyEarnings {
      week
      earnings
      sessions
    }
  }
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| JWT_SECRET | Secret key for JWT | Yes |
| JWT_EXPIRES_IN | Token expiry (e.g., 7d) | No |
| TWILIO_ACCOUNT_SID | Twilio account SID | Yes |
| TWILIO_AUTH_TOKEN | Twilio auth token | Yes |
| TWILIO_PHONE_NUMBER | Twilio phone number | Yes |
| EMAIL_FROM | Sender email address | Yes |
| EMAIL_SERVICE | Email service (gmail) | No |
| EMAIL_USER | Email username | Yes |
| EMAIL_PASSWORD | Email password | Yes |
| RAZORPAY_KEY_ID | Razorpay key ID | Yes |
| RAZORPAY_KEY_SECRET | Razorpay secret | Yes |
| FRONTEND_URL | Frontend URL | Yes |

### AWS Permissions

Ensure your AWS user/role has:
- DynamoDB full access
- Lambda execution role
- API Gateway permissions
- CloudWatch Logs

## 🧪 Testing

```bash
npm test
```

## 📝 API Documentation

GraphQL Playground is available at:
- **Local:** http://localhost:3000/dev/graphql
- **Dev:** https://your-api.execute-api.us-east-1.amazonaws.com/dev/graphql

## 🚨 Error Handling

All errors follow this format:
```json
{
  "errors": [
    {
      "message": "Error message",
      "code": "ERROR_CODE",
      "path": ["fieldName"]
    }
  ]
}
```

Common error codes:
- `UNAUTHENTICATED` - Not logged in
- `FORBIDDEN` - Insufficient permissions
- `BAD_USER_INPUT` - Invalid input
- `INTERNAL_SERVER_ERROR` - Server error

## 🔒 Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Input validation with validator.js
- Rate limiting (configure in API Gateway)
- CORS enabled for frontend domains

## 📈 Monitoring

- CloudWatch Logs for Lambda functions
- DynamoDB metrics in CloudWatch
- Custom metrics for API usage

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Deploy to dev
5. Create pull request

## 📄 License

Private - HomeGuru Platform
