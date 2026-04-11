// utils/api.ts - Use in any child app (teacher/student/onboarding)

// ✅ Correct: Relative paths work automatically with basePath
export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
}

// Example usage in components:
// const data = await fetchAPI('/example');
// const result = await fetchAPI('/users', { method: 'POST', body: JSON.stringify({...}) });

// ✅ For navigation within the same app
import { useRouter } from 'next/navigation';

export function useAppNavigation() {
  const router = useRouter();
  
  // Navigate within the same app - basePath is automatically handled
  const navigate = (path: string) => {
    router.push(path); // e.g., navigate('/dashboard')
  };
  
  return { navigate };
}

// ✅ For cross-app navigation (from one app to another)
export function navigateToApp(app: 'teacher' | 'student' | 'onboarding', path: string = '') {
  window.location.href = `http://localhost:3000/${app}${path}`;
}

// Example: navigateToApp('student', '/profile')
