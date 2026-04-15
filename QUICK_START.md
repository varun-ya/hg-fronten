# HomeGuru Complete System - Quick Start Guide

## 🚀 Complete Setup in 10 Minutes

### Prerequisites
- Node.js 18+
- AWS Account
- Twilio Account
- Gmail Account
- Razorpay Account

---

## Step 1: Backend Setup (3 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Start local server
npm run dev
```

✅ Backend running at: `http://localhost:3000/dev/graphql`

---

## Step 2: Web Onboarding Setup (2 minutes)

```bash
# Navigate to web onboarding
cd ../homeguru

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/dev/graphql" > .env.local

# Start development server
npm run dev
```

✅ Onboarding running at: `http://localhost:3000`

---

## Step 3: Student Dashboard Setup (2 minutes)

```bash
# Navigate to student dashboard
cd ../hg_teacher/student-webapp

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/dev/graphql" > .env.local

# Start development server
npm run dev
```

✅ Student Dashboard running at: `http://localhost:3002`

---

## Step 4: Teacher Dashboard Setup (2 minutes)

```bash
# Navigate to teacher dashboard
cd ../eleven-labs-dashboard

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/dev/graphql" > .env.local

# Start development server
npm run dev
```

✅ Teacher Dashboard running at: `http://localhost:3001`

---

## Step 5: Mobile App Setup (1 minute)

```bash
# Navigate to mobile app
cd ../../mobapp/homeguru-app

# Install dependencies
flutter pub get

# Update GraphQL endpoint in lib/services/graphql_service.dart
# Change _endpoint to: http://your-computer-ip:3000/dev/graphql

# Run app
flutter run
```

✅ Mobile app running on emulator/device

---

## 🧪 Test the Complete Flow

### 1. Test Signup (Web Onboarding)

1. Open `http://localhost:3000/onboarding`
2. Enter email, phone, password
3. Click "Send OTP" (check console for OTP code)
4. Enter OTP and verify
5. Complete all onboarding steps
6. Should redirect to dashboard

### 2. Test Student Dashboard

1. Open `http://localhost:3002`
2. Should see student profile data
3. Search for tutors
4. View upcoming sessions
5. Check analytics

### 3. Test Teacher Dashboard

1. Open `http://localhost:3001`
2. Should see tutor profile data
3. View students list
4. Check earnings
5. View demo requests

### 4. Test Mobile App

1. Open app on device/emulator
2. Complete onboarding flow
3. Navigate through tabs
4. Test all features

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    AWS Lambda + API Gateway              │
│                  GraphQL Backend (Port 3000)             │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   DynamoDB   │  │    Twilio    │  │   Razorpay   │ │
│  │   Database   │  │   SMS/OTP    │  │   Payments   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                            │
                            │ GraphQL API
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Web Onboard  │    │   Student    │    │   Teacher    │
│ (Port 3000)  │    │  Dashboard   │    │  Dashboard   │
│              │    │ (Port 3002)  │    │ (Port 3001)  │
│  Next.js 15  │    │  Next.js 16  │    │  Next.js 16  │
└──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │  Mobile App  │
                    │   Flutter    │
                    │ iOS/Android  │
                    └──────────────┘
```

---

## 🔑 Key Features Implemented

### Backend (GraphQL API)
- ✅ User authentication (JWT)
- ✅ OTP verification (Twilio)
- ✅ Email verification
- ✅ Student onboarding
- ✅ Tutor onboarding
- ✅ Session management
- ✅ Booking system
- ✅ Messaging
- ✅ Payments (Razorpay)
- ✅ Analytics
- ✅ DynamoDB integration

### Web Onboarding
- ✅ 8-page onboarding flow
- ✅ Walking owl animation
- ✅ Typing bubble effect
- ✅ Card stack animation
- ✅ OTP verification
- ✅ Email verification
- ✅ Dynamic content
- ✅ State persistence

### Student Dashboard
- ✅ Profile management
- ✅ Tutor search
- ✅ Session scheduling
- ✅ Analytics dashboard
- ✅ Assignments
- ✅ Class notes
- ✅ Wallet
- ✅ Chat

### Teacher Dashboard
- ✅ Profile management
- ✅ Student management
- ✅ Earnings tracking
- ✅ Demo requests
- ✅ Schedule management
- ✅ Analytics
- ✅ Availability settings

### Mobile App
- ✅ Dual-role (Student/Tutor)
- ✅ Comprehensive onboarding
- ✅ Hoot mascot animations
- ✅ Walkthrough guide
- ✅ All dashboard features

---

## 🔧 Environment Variables Summary

### Backend (.env)
```env
JWT_SECRET=your-secret-key
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
EMAIL_FROM=noreply@homeguru.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
FRONTEND_URL=http://localhost:3000
```

### All Frontend Apps (.env.local)
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/dev/graphql
```

---

## 📝 Common Commands

### Backend
```bash
npm run dev          # Start local server
npm run deploy:dev   # Deploy to AWS dev
npm run deploy:prod  # Deploy to AWS prod
npm test            # Run tests
```

### Frontend (All Apps)
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run linter
```

### Mobile
```bash
flutter pub get     # Install dependencies
flutter run         # Run on device/emulator
flutter build apk   # Build Android APK
flutter build ios   # Build iOS app
```

---

## 🐛 Troubleshooting

### Backend not starting?
```bash
# Check Node version
node --version  # Should be 18+

# Check AWS credentials
aws configure list

# Check environment variables
cat .env
```

### Frontend not connecting?
```bash
# Check GraphQL URL
echo $NEXT_PUBLIC_GRAPHQL_URL

# Test backend
curl http://localhost:3000/dev/graphql

# Check browser console for errors
```

### Mobile app not connecting?
```bash
# Check IP address
ipconfig  # Windows
ifconfig  # Mac/Linux

# Update endpoint in graphql_service.dart
# Use computer IP, not localhost
```

---

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Integration Guide](./backend/INTEGRATION_GUIDE.md)
- [Onboarding Analysis](./homeguru/ONBOARDING_ANALYSIS.md)
- [Student Dashboard Analysis](./hg_teacher/student-webapp/ANALYSIS.md)
- [Teacher Dashboard Analysis](./hg_teacher/eleven-labs-dashboard/ANALYSIS.md)
- [Mobile App Analysis](./mobapp/homeguru-app/ANALYSIS.md)

---

## 🎯 Next Steps

1. **Deploy Backend to AWS**
   ```bash
   cd backend
   npm run deploy:prod
   ```

2. **Update Frontend URLs**
   - Update all `.env.local` files with production GraphQL URL

3. **Configure Custom Domain**
   - Add custom domain in API Gateway
   - Update CORS settings

4. **Setup CI/CD**
   - GitHub Actions for automated deployment
   - Automated testing

5. **Add Monitoring**
   - CloudWatch for backend
   - Sentry for frontend errors
   - Analytics tracking

6. **Security Hardening**
   - Rate limiting
   - Input sanitization
   - HTTPS only
   - Security headers

---

## ✅ Production Checklist

- [ ] Backend deployed to AWS
- [ ] DynamoDB tables created
- [ ] Environment variables configured
- [ ] Twilio SMS working
- [ ] Email service working
- [ ] Razorpay payments working
- [ ] Frontend apps deployed
- [ ] Custom domain configured
- [ ] SSL certificates installed
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Monitoring setup
- [ ] Backup strategy in place
- [ ] Documentation complete

---

## 🤝 Support

For issues or questions:
1. Check documentation
2. Review error logs
3. Test with GraphQL Playground
4. Check AWS CloudWatch logs

---

## 📄 License

Private - HomeGuru Platform

---

**🎉 Congratulations! Your complete HomeGuru system is now running!**
