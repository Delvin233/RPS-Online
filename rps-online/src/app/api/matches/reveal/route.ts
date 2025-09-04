import { NextRequest, NextResponse } from 'next/server';
import { matchStore } from '@/lib/matchStore';

export async function POST(request: NextRequest) {
  try {
    const { matchId, playerId } = await request.json();
    
    if (!matchId || !playerId) {
      return NextResponse.json({ error: 'Match ID and Player ID required' }, { status: 400 });
    }

    const match = await matchStore.revealMove(matchId, playerId);
    
    if (!match) {
      return NextResponse.json({ error: 'Match not found or not ready for reveal' }, { status: 404 });
    }

    return NextResponse.json({ match });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reveal move' }, { status: 500 });
  }
}