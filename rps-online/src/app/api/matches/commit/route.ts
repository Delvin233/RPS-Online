import { NextRequest, NextResponse } from 'next/server';
import { matchStore } from '@/lib/matchStore';

export async function POST(request: NextRequest) {
  console.log('Commit API route hit');
  return NextResponse.json({ success: true, message: 'Commit API working' });
}