import { NextRequest, NextResponse } from 'next/server';
import { matchStore } from '@/lib/matchStore';

export async function POST(request: NextRequest) {
  try {
    const { matchId, playerId } = await request.json();
    
    console.log('Join match request:', { matchId, playerId });
    
    if (!matchId || !playerId) {
      return NextResponse.json({ error: 'Match ID and Player ID required' }, { status: 400 });
    }

    const existingMatch = await matchStore.getMatch(matchId);
    console.log('Existing match:', existingMatch);
    
    const match = await matchStore.joinMatch(matchId, playerId);
    
    if (!match) {
      return NextResponse.json({ error: 'Match not found or already full' }, { status: 404 });
    }

    console.log('Joined match:', match);
    return NextResponse.json({ match });
  } catch (error) {
    console.error('Join match error:', error);
    return NextResponse.json({ error: 'Failed to join match' }, { status: 500 });
  }
}