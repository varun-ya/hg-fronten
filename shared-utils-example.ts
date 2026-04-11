// shared/utils/navigation.ts
// Copy this to each child app's utils folder

/**
 * Navigation utility for multi-app architecture
 */

// App configuration
const APPS = {
  teacher: { path: '/teacher', port: 3001 },
  student: { path: '/student', port: 3002 },
  onboarding: { path: '/onboarding', port: 3003 },
} as const;

type AppName = keyof typeof APPS;

/**
 * Navigate to another app
 * @param app - Target app name
 * @param path - Path within the target app (optional)
 */
export function navigateToApp(app: AppName, path: string = '') {
  const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:3000';
  const targetPath = `${APPS[app].path}${path}`;
  window.location.href = `${gatewayUrl}${targetPath}`;
}

/**
 * Get the current app name based on basePath
 */
export function getCurrentApp(): AppName | null {
  if (typeof window === 'undefined') return null;
  
  const path = window.location.pathname;
  for (const [name, config] of Object.entries(APPS)) {
    if (path.startsWith(config.path)) {
      return name as AppName;
    }
  }
  return null;
}

/**
 * Check if currently in a specific app
 */
export function isCurrentApp(app: AppName): boolean {
  return getCurrentApp() === app;
}

/**
 * Build URL for API calls (handles basePath automatically)
 */
export function buildApiUrl(endpoint: string): string {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `/api${cleanEndpoint}`;
}

/**
 * Fetch wrapper with automatic basePath handling
 */
export async function fetchAPI<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = buildApiUrl(endpoint);
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Example usage:
// 
// // Navigate to another app
// navigateToApp('student', '/dashboard');
// 
// // API call within same app
// const data = await fetchAPI('/users');
// 
// // Check current app
// if (isCurrentApp('teacher')) {
//   console.log('In teacher app');
// }
