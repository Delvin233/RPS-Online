import { NextRequest, NextResponse } from 'next/server';
import { matchStore } from '@/lib/matchStore';

export async function POST(request: NextRequest) {
  try {
    const { matchId, playerId, choice } = await request.json();
    
    if (!matchId || !playerId || !choice) {
      return NextResponse.json({ error: 'Match ID, Player ID, and choice required' }, { status: 400 });
    }

    const match = await matchStore.commitMove(matchId, playerId, choice);
    
    if (!match) {
      return NextResponse.json({ error: 'Match not found or invalid move' }, { status: 404 });
    }

    return NextResponse.json({ match });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to commit move' }, { status: 500 });
  }
}