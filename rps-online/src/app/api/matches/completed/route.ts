import { NextResponse } from 'next/server';
import { matchStore } from '@/lib/matchStore';

export async function GET() {
  try {
    const matches = await matchStore.getCompletedMatches();
    return NextResponse.json({ matches });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch completed matches' }, { status: 500 });
  }
}