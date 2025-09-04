import { NextRequest, NextResponse } from 'next/server';
import { matchStore } from '@/lib/matchStore';

export async function POST(request: NextRequest) {
  try {
    const { matchId, playerId } = await request.json();
    
    if (!matchId || !playerId) {
      return NextResponse.json({ error: 'Match ID and Player ID required' }, { status: 400 });
    }

    const match = await matchStore.getMatch(matchId);
    
    if (!match || match.player1Id !== playerId || match.status !== 'waiting') {
      return NextResponse.json({ error: 'Cannot cancel match' }, { status: 404 });
    }

    await matchStore.deleteMatch(matchId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to cancel match' }, { status: 500 });
  }
}