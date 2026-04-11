// Example: teacher-dashboard/src/app/api/example/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Teacher API',
    basePath: '/teacher'
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ 
    success: true,
    data,
    basePath: '/teacher'
  });
}
