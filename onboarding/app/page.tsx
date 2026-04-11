'use client';
import Link from 'next/link';

export default function OnboardingHome() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Onboarding</h1>
      <p>Welcome! Let's get you started</p>
      <nav style={{ marginTop: '1rem' }}>
        <Link href="/step/1" style={{ marginRight: '1rem', color: 'blue' }}>Step 1</Link>
        <Link href="/step/2" style={{ marginRight: '1rem', color: 'blue' }}>Step 2</Link>
        <Link href="/step/3" style={{ color: 'blue' }}>Step 3</Link>
      </nav>
      <div style={{ marginTop: '2rem' }}>
        <a href="http://localhost:3000" style={{ color: 'green' }}>Back to Gateway</a>
      </div>
    </div>
  );
}
