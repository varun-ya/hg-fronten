# Gateway Setup Guide

## What This Does

The gateway app proxies requests to your existing apps:
- `http://localhost:3000/teacher` → teacher-dashboard (port 3001)
- `http://localhost:3000/student` → student-dashboard (port 3002)
- `http://localhost:3000/onboarding` → onboarding (port 3003)

## Prerequisites

Your existing apps MUST have `basePath` configured:

### teacher-dashboard/next.config.js
```javascript
module.exports = {
  basePath: '/teacher',
  assetPrefix: '/teacher',
};
```

### student-dashboard/next.config.js
```javascript
module.exports = {
  basePath: '/student',
  assetPrefix: '/student',
};
```

### onboarding/next.config.js
```javascript
module.exports = {
  basePath: '/onboarding',
  assetPrefix: '/onboarding',
};
```

## Running All Apps

### Option 1: Single Command (from root)
```bash
npm install  # Install concurrently
npm run dev
```

### Option 2: Individual Terminals
```bash
# Terminal 1 - Gateway
cd gateway
npm run dev

# Terminal 2 - Teacher
cd teacher-dashboard
npm run dev

# Terminal 3 - Student
cd student-dashboard
npm run dev

# Terminal 4 - Onboarding
cd onboarding
npm run dev
```

## Access URLs

- Gateway: http://localhost:3000
- Teacher: http://localhost:3000/teacher
- Student: http://localhost:3000/student
- Onboarding: http://localhost:3000/onboarding

## Frontend Code Patterns

### API Calls (within same app)
```typescript
// ✅ Use relative paths - basePath is automatic
const response = await fetch('/api/users');
const data = await response.json();

// With axios
import axios from 'axios';
const { data } = await axios.get('/api/users');
```

### Navigation (within same app)
```typescript
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ✅ Links work automatically
<Link href="/dashboard">Dashboard</Link>

// ✅ Programmatic navigation
const router = useRouter();
router.push('/profile');
```

### Cross-App Navigation
```typescript
// Navigate from teacher to student
window.location.href = 'http://localhost:3000/student/dashboard';

// Or create a utility
export function navigateToApp(app: string, path: string = '') {
  window.location.href = `http://localhost:3000/${app}${path}`;
}

// Usage
navigateToApp('student', '/profile');
```

## Environment Variables

### Gateway (.env.local)
```env
TEACHER_PORT=3001
STUDENT_PORT=3002
ONBOARDING_PORT=3003
```

Change ports if your apps run on different ports.

## How It Works

1. Gateway receives request: `http://localhost:3000/teacher/dashboard`
2. Rewrite rule matches: `/teacher/:path*`
3. Proxies to: `http://localhost:3001/dashboard`
4. Teacher app handles with basePath: `/teacher`
5. Response sent back through gateway

## Troubleshooting

### Assets not loading?
Ensure `assetPrefix` is set in child app configs.

### API routes failing?
Use relative paths (`/api/...`) not absolute URLs.

### 404 errors?
Verify `basePath` in child apps matches gateway routes.

### Port conflicts?
Change ports in `.env.local` and child app package.json.

## Production

Deploy each app independently:
- Gateway on main domain
- Child apps on subdomains or separate servers
- Update rewrite destinations to production URLs
