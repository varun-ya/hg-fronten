# Multi-App Next.js Gateway Architecture

## 📁 Project Structure

```
clone/
├── gateway/                    # Gateway app (port 3000)
├── teacher-dashboard/          # Teacher app (port 3001)
├── student-dashboard/          # Student app (port 3002)
├── onboarding/                 # Onboarding app (port 3003)
├── package.json                # Root scripts
└── .env.local                  # Environment variables
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all app dependencies
npm run install:all
```

### 2. Run All Apps

```bash
# Single command to run all apps concurrently
npm run dev
```

This starts:
- Gateway: http://localhost:3000
- Teacher: http://localhost:3001 (accessed via http://localhost:3000/teacher)
- Student: http://localhost:3002 (accessed via http://localhost:3000/student)
- Onboarding: http://localhost:3003 (accessed via http://localhost:3000/onboarding)

### 3. Run Individual Apps

```bash
npm run dev:gateway
npm run dev:teacher
npm run dev:student
npm run dev:onboarding
```

## ⚙️ Configuration Details

### Gateway App (next.config.js)

The gateway uses Next.js rewrites to proxy requests:

```javascript
async rewrites() {
  return [
    { source: '/teacher', destination: 'http://localhost:3001' },
    { source: '/teacher/:path*', destination: 'http://localhost:3001/:path*' },
    { source: '/student', destination: 'http://localhost:3002' },
    { source: '/student/:path*', destination: 'http://localhost:3002/:path*' },
    { source: '/onboarding', destination: 'http://localhost:3003' },
    { source: '/onboarding/:path*', destination: 'http://localhost:3003/:path*' },
  ];
}
```

### Child Apps (next.config.js)

Each child app needs basePath configuration:

```javascript
const nextConfig = {
  basePath: '/teacher',        // or '/student', '/onboarding'
  assetPrefix: '/teacher',     // Ensures assets load correctly
};
```

## 💻 Frontend Development Guide

### API Calls (Within Same App)

```typescript
// ✅ Correct - Relative paths work automatically
const response = await fetch('/api/users');

// ✅ With axios
import axios from 'axios';
const { data } = await axios.get('/api/users');
```

### Navigation (Within Same App)

```typescript
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ✅ Links work automatically with basePath
<Link href="/dashboard">Dashboard</Link>
<Link href="/profile">Profile</Link>

// ✅ Programmatic navigation
const router = useRouter();
router.push('/dashboard');
```

### Cross-App Navigation

```typescript
// Navigate from teacher app to student app
window.location.href = 'http://localhost:3000/student/profile';

// Or create a utility:
export function navigateToApp(app: string, path: string = '') {
  window.location.href = `http://localhost:3000/${app}${path}`;
}

// Usage:
navigateToApp('student', '/dashboard');
```

### Image Assets

```typescript
import Image from 'next/image';

// ✅ Public folder images work automatically
<Image src="/logo.png" alt="Logo" width={100} height={100} />
```

## 🔧 Environment Variables

### Root (.env.local)
```
GATEWAY_PORT=3000
TEACHER_PORT=3001
STUDENT_PORT=3002
ONBOARDING_PORT=3003
```

### Gateway (.env.local)
```
TEACHER_APP_URL=http://localhost:3001
STUDENT_APP_URL=http://localhost:3002
ONBOARDING_APP_URL=http://localhost:3003
```

### Child Apps (.env.local)
```
# Add app-specific variables
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_APP_NAME=Teacher Dashboard
```

## 📝 Important Notes

### ✅ DO:
- Use relative paths for API calls (`/api/...`)
- Use relative paths for navigation (`/dashboard`)
- Keep basePath in child app configs
- Use Link component for internal navigation
- Access apps via gateway URL in production

### ❌ DON'T:
- Hardcode `http://localhost:3001` in child apps
- Remove basePath from child configs
- Use absolute URLs for same-app navigation
- Mix ports in frontend code

## 🎯 Dynamic Routes Support

All dynamic routes work automatically:

```
/teacher/dashboard/[id]       → teacher-dashboard/app/dashboard/[id]/page.tsx
/student/profile/[userId]     → student-dashboard/app/profile/[userId]/page.tsx
/onboarding/step/[stepId]     → onboarding/app/step/[stepId]/page.tsx
```

## 🔌 API Routes

API routes work seamlessly:

```
/teacher/api/users            → teacher-dashboard/app/api/users/route.ts
/student/api/profile          → student-dashboard/app/api/profile/route.ts
```

## 🏗️ Production Build

```bash
# Build all apps
cd gateway && npm run build
cd ../teacher-dashboard && npm run build
cd ../student-dashboard && npm run build
cd ../onboarding && npm run build

# Start all apps
npm run dev  # or use PM2/Docker for production
```

## 🐛 Troubleshooting

### Assets not loading?
- Ensure `assetPrefix` is set in child app configs
- Check public folder structure

### API calls failing?
- Verify basePath in next.config.js
- Use relative paths (`/api/...`)

### Navigation not working?
- Check basePath configuration
- Use Next.js Link component

### Port conflicts?
- Change ports in package.json scripts
- Update gateway rewrites accordingly

## 📦 Adding New Apps

1. Create new app folder
2. Add next.config.js with basePath
3. Add package.json with port
4. Update gateway rewrites
5. Add script to root package.json

Example:
```javascript
// gateway/next.config.js - add:
{
  source: '/admin/:path*',
  destination: 'http://localhost:3004/:path*',
}

// admin/next.config.js
module.exports = {
  basePath: '/admin',
  assetPrefix: '/admin',
};
```

## 🎨 Example Component (Child App)

```typescript
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);

  // ✅ API call
  const fetchData = async () => {
    const res = await fetch('/api/dashboard');
    const json = await res.json();
    setData(json);
  };

  // ✅ Navigation
  const goToProfile = () => {
    router.push('/profile');
  };

  // ✅ Cross-app navigation
  const goToStudent = () => {
    window.location.href = 'http://localhost:3000/student';
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/settings">Settings</Link>
      <button onClick={goToProfile}>Profile</button>
      <button onClick={goToStudent}>Student App</button>
    </div>
  );
}
```

## 🚦 Development Workflow

1. Start all apps: `npm run dev`
2. Access via gateway: `http://localhost:3000/teacher`
3. Develop in child apps normally
4. Hot reload works for all apps
5. Build and deploy independently

## ✨ Benefits

- ✅ Independent deployments
- ✅ Separate codebases
- ✅ Unified development experience
- ✅ No nginx/Docker required
- ✅ Native Next.js solution
- ✅ Hot reload for all apps
- ✅ Easy to scale
