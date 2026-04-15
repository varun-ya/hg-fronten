# Frontend-Backend Integration Guide

Complete guide to connect all HomeGuru frontend applications with the GraphQL backend.

## 📋 Overview

This guide covers integration for:
- **Web Onboarding** (homeguru)
- **Student Dashboard** (student-webapp)
- **Teacher Dashboard** (eleven-labs-dashboard)
- **Mobile App** (homeguru-app)

## 🔧 Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
JWT_SECRET=your-secret-key-min-32-characters
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

### 3. Deploy Backend

```bash
# Local development
npm run dev

# Deploy to AWS
npm run deploy:dev
```

Note your GraphQL endpoint:
```
https://xxxxxx.execute-api.us-east-1.amazonaws.com/dev/graphql
```

## 🌐 Web Integration

### Install Apollo Client

```bash
# In each web app
npm install @apollo/client graphql
```

### Create Apollo Client

Create `lib/apollo-client.ts`:

```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/dev/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

### Update Root Layout

```typescript
// app/layout.tsx
'use client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={apolloClient}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
```

### Add Environment Variable

Create `.env.local`:
```env
NEXT_PUBLIC_GRAPHQL_URL=https://your-api.execute-api.us-east-1.amazonaws.com/dev/graphql
```

## 📱 Onboarding Integration (homeguru)

### 1. Update OnboardingCredentials.tsx

```typescript
import { useMutation, gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;

const SEND_OTP_MUTATION = gql`
  mutation SendOTP($phone: String!, $countryCode: String!) {
    sendOTP(phone: $phone, countryCode: $countryCode) {
      success
      message
      expiresAt
    }
  }
`;

const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($phone: String!, $countryCode: String!, $otp: String!) {
    verifyOTP(phone: $phone, countryCode: $countryCode, otp: $otp) {
      success
      message
    }
  }
`;

export default function OnboardingCredentials({ onNext }: Props) {
  const [signup] = useMutation(SIGNUP_MUTATION);
  const [sendOTP] = useMutation(SEND_OTP_MUTATION);
  const [verifyOTP] = useMutation(VERIFY_OTP_MUTATION);

  const handleSendOTP = async () => {
    try {
      const { data } = await sendOTP({
        variables: { phone, countryCode: code },
      });
      if (data.sendOTP.success) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const { data } = await verifyOTP({
        variables: { phone, countryCode: code, otp },
      });
      if (data.verifyOTP.success) {
        setOtpOk(true);
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };

  const handleContinue = async () => {
    if (!canProceed) return;
    
    try {
      const { data } = await signup({
        variables: {
          input: {
            email,
            phone,
            countryCode: code,
            password: pass,
            role: 'STUDENT',
          },
        },
      });
      
      // Save token
      localStorage.setItem('token', data.signup.token);
      localStorage.setItem('userId', data.signup.user.id);
      
      onNext();
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  // ... rest of component
}
```

### 2. Update OnboardingProfile.tsx

```typescript
import { useMutation, gql } from '@apollo/client';

const COMPLETE_ONBOARDING_MUTATION = gql`
  mutation CompleteStudentOnboarding($input: StudentOnboardingInput!) {
    completeStudentOnboarding(input: $input) {
      id
      name
      category
    }
  }
`;

export default function OnboardingProfile({ onNext }: Props) {
  const [completeOnboarding] = useMutation(COMPLETE_ONBOARDING_MUTATION);

  const handleSubmit = async () => {
    try {
      const { data } = await completeOnboarding({
        variables: {
          input: {
            name,
            dateOfBirth,
            gender,
            category,
            location,
            // Include all onboarding data from localStorage
            heardFrom: localStorage.getItem('onboarding_heardFrom'),
            interest: localStorage.getItem('onboarding_interest'),
            subject: localStorage.getItem('onboarding_subject'),
            knowledgeLevel: localStorage.getItem('onboarding_knowledge'),
          },
        },
      });
      
      localStorage.setItem('studentId', data.completeStudentOnboarding.id);
      onNext(category);
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  // ... rest of component
}
```

## 🎓 Student Dashboard Integration (student-webapp)

### 1. Create GraphQL Queries

Create `lib/graphql/queries.ts`:

```typescript
import { gql } from '@apollo/client';

export const GET_STUDENT_PROFILE = gql`
  query GetStudentProfile {
    myStudentProfile {
      id
      name
      xp
      streak
      sessionsCompleted
      hoursLearned
    }
  }
`;

export const GET_UPCOMING_SESSIONS = gql`
  query GetUpcomingSessions {
    upcomingSessions {
      id
      subject
      scheduledAt
      duration
      tutor {
        name
        avatar
      }
    }
  }
`;

export const SEARCH_TUTORS = gql`
  query SearchTutors($subject: String, $minRating: Float) {
    searchTutors(subject: $subject, minRating: $minRating, limit: 10) {
      id
      name
      bio
      subjects
      rating
      pricing
    }
  }
`;

export const GET_STUDENT_ANALYTICS = gql`
  query GetStudentAnalytics {
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
`;
```

### 2. Update Dashboard Page

```typescript
// app/page.tsx
'use client';
import { useQuery } from '@apollo/client';
import { GET_STUDENT_PROFILE, GET_UPCOMING_SESSIONS } from '@/lib/graphql/queries';

export default function StudentDashboard() {
  const { data: profileData, loading: profileLoading } = useQuery(GET_STUDENT_PROFILE);
  const { data: sessionsData, loading: sessionsLoading } = useQuery(GET_UPCOMING_SESSIONS);

  if (profileLoading || sessionsLoading) {
    return <div>Loading...</div>;
  }

  const student = profileData?.myStudentProfile;
  const upcomingSessions = sessionsData?.upcomingSessions || [];

  return (
    <div>
      <h1>Welcome, {student?.name}!</h1>
      <div>
        <p>XP: {student?.xp}</p>
        <p>Streak: {student?.streak} days</p>
        <p>Sessions: {student?.sessionsCompleted}</p>
      </div>
      
      <h2>Upcoming Sessions</h2>
      {upcomingSessions.map(session => (
        <div key={session.id}>
          <h3>{session.subject}</h3>
          <p>Tutor: {session.tutor.name}</p>
          <p>Time: {new Date(session.scheduledAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
```

### 3. Update Search Page

```typescript
// app/search/page.tsx
'use client';
import { useQuery } from '@apollo/client';
import { SEARCH_TUTORS } from '@/lib/graphql/queries';

export default function SearchPage() {
  const [subject, setSubject] = useState('');
  const { data, loading, refetch } = useQuery(SEARCH_TUTORS, {
    variables: { subject, minRating: 4.0 },
  });

  const tutors = data?.searchTutors || [];

  return (
    <div>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Search subject..."
      />
      <button onClick={() => refetch()}>Search</button>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {tutors.map(tutor => (
            <div key={tutor.id}>
              <h3>{tutor.name}</h3>
              <p>{tutor.bio}</p>
              <p>Rating: {tutor.rating} ⭐</p>
              <p>Subjects: {tutor.subjects.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 👨‍🏫 Teacher Dashboard Integration (eleven-labs-dashboard)

### 1. Create GraphQL Queries

```typescript
// lib/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_TUTOR_PROFILE = gql`
  query GetTutorProfile {
    myTutorProfile {
      id
      name
      rating
      totalSessions
      totalEarnings
      activeStudents
    }
  }
`;

export const GET_MY_STUDENTS = gql`
  query GetMyStudents {
    myStudents {
      id
      name
      grade
      sessionsCompleted
    }
  }
`;

export const GET_DEMO_REQUESTS = gql`
  query GetDemoRequests {
    demoRequests {
      id
      student {
        name
      }
      subject
      message
      createdAt
    }
  }
`;

export const GET_TUTOR_ANALYTICS = gql`
  query GetTutorAnalytics {
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
`;
```

### 2. Update Dashboard

```typescript
// app/page.tsx
'use client';
import { useQuery } from '@apollo/client';
import { GET_TUTOR_PROFILE, GET_TUTOR_ANALYTICS } from '@/lib/graphql/queries';

export default function TutorDashboard() {
  const { data: profileData } = useQuery(GET_TUTOR_PROFILE);
  const { data: analyticsData } = useQuery(GET_TUTOR_ANALYTICS);

  const tutor = profileData?.myTutorProfile;
  const analytics = analyticsData?.myTutorAnalytics;

  return (
    <div>
      <h1>Welcome, {tutor?.name}!</h1>
      <div>
        <p>Earned this month: ₹{analytics?.thisMonthEarnings}</p>
        <p>Active students: {tutor?.activeStudents}</p>
        <p>Rating: {tutor?.rating} ⭐</p>
      </div>
    </div>
  );
}
```

## 📱 Mobile App Integration (Flutter)

### 1. Add Dependencies

```yaml
# pubspec.yaml
dependencies:
  graphql_flutter: ^5.1.2
  shared_preferences: ^2.2.2
```

### 2. Create GraphQL Client

```dart
// lib/services/graphql_service.dart
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

class GraphQLService {
  static const String _endpoint = 'https://your-api.execute-api.us-east-1.amazonaws.com/dev/graphql';
  
  static Future<GraphQLClient> getClient() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    
    final httpLink = HttpLink(_endpoint);
    
    final authLink = AuthLink(
      getToken: () async => token != null ? 'Bearer $token' : null,
    );
    
    final link = authLink.concat(httpLink);
    
    return GraphQLClient(
      cache: GraphQLCache(),
      link: link,
    );
  }
}
```

### 3. Wrap App with GraphQL Provider

```dart
// lib/main.dart
import 'package:graphql_flutter/graphql_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  final client = await GraphQLService.getClient();
  
  runApp(
    GraphQLProvider(
      client: ValueNotifier(client),
      child: const HomeGuruApp(),
    ),
  );
}
```

### 4. Use Queries and Mutations

```dart
// lib/screens/dashboard/student_home_tab.dart
import 'package:graphql_flutter/graphql_flutter.dart';

class StudentHomeTab extends StatelessWidget {
  static const String getProfileQuery = '''
    query GetStudentProfile {
      myStudentProfile {
        id
        name
        xp
        streak
        sessionsCompleted
      }
    }
  ''';
  
  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: gql(getProfileQuery),
        pollInterval: const Duration(seconds: 30),
      ),
      builder: (result, {fetchMore, refetch}) {
        if (result.isLoading) {
          return const CircularProgressIndicator();
        }
        
        if (result.hasException) {
          return Text('Error: ${result.exception}');
        }
        
        final student = result.data?['myStudentProfile'];
        
        return Column(
          children: [
            Text('Welcome, ${student['name']}!'),
            Text('XP: ${student['xp']}'),
            Text('Streak: ${student['streak']} days'),
          ],
        );
      },
    );
  }
}
```

## 🔐 Authentication Flow

### Login Component

```typescript
// components/LoginForm.tsx
'use client';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;

export default function LoginForm() {
  const router = useRouter();
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data } = await login({
        variables: { email, password },
      });
      
      // Save token
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('userId', data.login.user.id);
      localStorage.setItem('userRole', data.login.user.role);
      
      // Redirect based on role
      if (data.login.user.role === 'STUDENT') {
        router.push('/dashboard');
      } else if (data.login.user.role === 'TUTOR') {
        router.push('/teacher-dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
```

## 🧪 Testing the Integration

### 1. Start Backend

```bash
cd backend
npm run dev
```

### 2. Start Frontend

```bash
# Web onboarding
cd homeguru
npm run dev

# Student dashboard
cd student-webapp
npm run dev

# Teacher dashboard
cd eleven-labs-dashboard
npm run dev
```

### 3. Test Flow

1. **Signup:** Go to onboarding, complete signup
2. **OTP:** Verify phone with OTP
3. **Onboarding:** Complete all onboarding steps
4. **Dashboard:** Should redirect to dashboard with data
5. **Search:** Search for tutors
6. **Book:** Book a demo session

## 🐛 Troubleshooting

### CORS Issues

Add to `serverless.yml`:
```yaml
functions:
  graphql:
    events:
      - http:
          cors:
            origin: 'http://localhost:3000,http://localhost:3002,http://localhost:3001'
```

### Token Not Persisting

Check localStorage in browser DevTools:
```javascript
localStorage.getItem('token')
```

### GraphQL Errors

Check Network tab in DevTools for:
- Request payload
- Response errors
- Status codes

### Backend Logs

```bash
serverless logs -f graphql -t
```

## 📚 Additional Resources

- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [GraphQL Flutter Docs](https://pub.dev/packages/graphql_flutter)
- [Serverless Framework Docs](https://www.serverless.com/framework/docs)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)

## ✅ Checklist

- [ ] Backend deployed to AWS
- [ ] Environment variables configured
- [ ] Apollo Client installed in web apps
- [ ] GraphQL client configured in mobile app
- [ ] Authentication flow working
- [ ] Onboarding flow integrated
- [ ] Dashboard data loading
- [ ] Search functionality working
- [ ] Session booking working
- [ ] Payment integration tested
