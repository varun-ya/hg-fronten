'use client';
import Link from 'next/link';

export default function StudentHome() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Student Dashboard</h1>
      <p>Welcome to the student portal</p>
      <nav style={{ marginTop: '1rem' }}>
        <Link href="/dashboard" style={{ marginRight: '1rem', color: 'blue' }}>Dashboard</Link>
        <Link href="/courses" style={{ marginRight: '1rem', color: 'blue' }}>Courses</Link>
        <Link href="/profile" style={{ color: 'blue' }}>Profile</Link>
      </nav>
      <div style={{ marginTop: '2rem' }}>
        <a href="http://localhost:3000/teacher" style={{ color: 'green' }}>Go to Teacher App</a>
      </div>
    </div>
  );
}
