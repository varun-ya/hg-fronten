# Setup Instructions

## Step 1: Install Dependencies

```bash
# Install concurrently for running multiple apps
npm install

# Install dependencies for all apps
npm run install:all
```

Or manually:
```bash
cd gateway && npm install
cd ../teacher-dashboard && npm install
cd ../student-dashboard && npm install
cd ../onboarding && npm install
```

## Step 2: Initialize Next.js Apps (if not already created)

If you need to create the Next.js apps from scratch:

```bash
# Gateway
cd gateway
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Teacher Dashboard
cd ../teacher-dashboard
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Student Dashboard
cd ../student-dashboard
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Onboarding
cd ../onboarding
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
```

## Step 3: Copy Configuration Files

Ensure each app has the correct `next.config.js`:

### Gateway (no basePath needed)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/teacher', destination: 'http://localhost:3001' },
      { source: '/teacher/:path*', destination: 'http://localhost:3001/:path*' },
      { source: '/student', destination: 'http://localhost:3002' },
      { source: '/student/:path*', destination: 'http://localhost:3002/:path*' },
      { source: '/onboarding', destination: 'http://localhost:3003' },
      { source: '/onboarding/:path*', destination: 'http://localhost:3003/:path*' },
    ];
  },
};
module.exports = nextConfig;
```

### Child Apps (teacher/student/onboarding)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/teacher',        // Change per app: /student, /onboarding
  assetPrefix: '/teacher',     // Change per app: /student, /onboarding
};
module.exports = nextConfig;
```

## Step 4: Update package.json Scripts

Each child app should have:
```json
{
  "scripts": {
    "dev": "next dev -p 3001",    // Change port per app
    "build": "next build",
    "start": "next start -p 3001"
  }
}
```

## Step 5: Run All Apps

### Option 1: Single Command (Recommended)
```bash
npm run dev
```

### Option 2: Windows Batch Script
```bash
start-all.bat
```

### Option 3: Individual Terminals
```bash
# Terminal 1
npm run dev:gateway

# Terminal 2
npm run dev:teacher

# Terminal 3
npm run dev:student

# Terminal 4
npm run dev:onboarding
```

## Step 6: Verify Setup

Open your browser and test:

- Gateway: http://localhost:3000
- Teacher: http://localhost:3000/teacher
- Student: http://localhost:3000/student
- Onboarding: http://localhost:3000/onboarding

## Step 7: Add Environment Variables (Optional)

Create `.env.local` in each app if needed:

```env
# Example for teacher-dashboard/.env.local
NEXT_PUBLIC_APP_NAME=Teacher Dashboard
NEXT_PUBLIC_API_URL=/api
DATABASE_URL=your_database_url
```

## Common Issues & Solutions

### Issue: Port already in use
**Solution:** Kill the process or change port in package.json

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Change port in package.json
"dev": "next dev -p 3005"
```

### Issue: Assets not loading
**Solution:** Ensure `assetPrefix` is set in child app configs

### Issue: 404 on routes
**Solution:** Verify `basePath` matches gateway rewrite source

### Issue: API calls failing
**Solution:** Use relative paths (`/api/...`) not absolute URLs

## Development Tips

1. **Hot Reload**: Works for all apps independently
2. **Debugging**: Use browser DevTools, check Network tab
3. **Logs**: Each app logs to its own terminal
4. **Port Conflicts**: Change ports in package.json and gateway rewrites
5. **Cross-App Links**: Use full gateway URL for navigation between apps

## Production Deployment

```bash
# Build all apps
cd gateway && npm run build && cd ..
cd teacher-dashboard && npm run build && cd ..
cd student-dashboard && npm run build && cd ..
cd onboarding && npm run build && cd ..

# Deploy each app independently or use PM2
pm2 start ecosystem.config.js
```

## Next Steps

1. Create your app pages in `app/` directory
2. Add API routes in `app/api/` directory
3. Use the example components as reference
4. Test navigation and API calls
5. Add authentication if needed
6. Deploy to production

## Useful Commands

```bash
# Install new package in specific app
cd teacher-dashboard && npm install axios

# Clean install
rm -rf node_modules package-lock.json && npm install

# Check running processes
netstat -ano | findstr :3000

# Build specific app
cd teacher-dashboard && npm run build
```
