import { NextResponse } from 'next/server';
import { findUniversity } from '@/lib/universityData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'University name is required' }, { status: 400 });
  }

  const university = findUniversity(name);

  if (university) {
    return NextResponse.json(university);
  } else {
    return NextResponse.json({ error: 'University not found' }, { status: 404 });
  }
}