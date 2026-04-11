'use client';
import Link from 'next/link';

export default function TeacherHome() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Teacher Dashboard</h1>
      <p>Welcome to the teacher portal</p>
      <nav style={{ marginTop: '1rem' }}>
        <Link href="/dashboard" style={{ marginRight: '1rem', color: 'blue' }}>Dashboard</Link>
        <Link href="/students" style={{ marginRight: '1rem', color: 'blue' }}>Students</Link>
        <Link href="/classes" style={{ color: 'blue' }}>Classes</Link>
      </nav>
      <div style={{ marginTop: '2rem' }}>
        <a href="http://localhost:3000/student" style={{ color: 'green' }}>Go to Student App</a>
      </div>
    </div>
  );
}
