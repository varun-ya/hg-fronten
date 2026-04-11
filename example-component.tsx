// Example: teacher-dashboard/src/components/ExampleComponent.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ExampleComponent() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ API Call - Relative path works with basePath
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ POST Request
  const createUser = async (userData: any) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  };

  // ✅ Navigation within same app
  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const goToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  // ✅ Cross-app navigation
  const goToStudentApp = () => {
    window.location.href = 'http://localhost:3000/student';
  };

  const goToOnboarding = () => {
    window.location.href = 'http://localhost:3000/onboarding/step/1';
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      {/* ✅ Internal Links - basePath handled automatically */}
      <nav className="mb-6 space-x-4">
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link href="/students" className="text-blue-600 hover:underline">
          Students
        </Link>
        <Link href="/classes" className="text-blue-600 hover:underline">
          Classes
        </Link>
        <Link href="/settings" className="text-blue-600 hover:underline">
          Settings
        </Link>
      </nav>

      {/* ✅ Images from public folder */}
      <div className="mb-6">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={100} 
          height={100}
          priority
        />
      </div>

      {/* ✅ Programmatic Navigation */}
      <div className="mb-6 space-x-2">
        <button 
          onClick={goToDashboard}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Dashboard
        </button>
        <button 
          onClick={() => goToProfile('123')}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          View Profile
        </button>
      </div>

      {/* ✅ Cross-App Navigation */}
      <div className="mb-6 space-x-2">
        <button 
          onClick={goToStudentApp}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Switch to Student App
        </button>
        <button 
          onClick={goToOnboarding}
          className="px-4 py-2 bg-orange-600 text-white rounded"
        >
          Go to Onboarding
        </button>
      </div>

      {/* ✅ API Data Display */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user: any) => (
              <li key={user.id} className="p-2 border rounded">
                <Link href={`/users/${user.id}`} className="text-blue-600">
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Dynamic Route Link */}
      <div className="mt-6">
        <Link 
          href="/classes/math-101" 
          className="text-blue-600 hover:underline"
        >
          View Math 101 Class
        </Link>
      </div>
    </div>
  );
}

// ============================================
// API Route Example
// ============================================

// teacher-dashboard/src/app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch from external API or database
  const users = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];
  
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Process the data
  const newUser = {
    id: Date.now().toString(),
    ...body,
  };
  
  return NextResponse.json(newUser, { status: 201 });
}

// ============================================
// Dynamic Route Example
// ============================================

// teacher-dashboard/src/app/users/[id]/page.tsx
export default function UserPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>User Profile: {params.id}</h1>
      <Link href="/users">Back to Users</Link>
    </div>
  );
}
