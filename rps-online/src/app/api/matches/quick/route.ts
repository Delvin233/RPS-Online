import { NextRequest, NextResponse } from 'next/server';
import { matchStore } from '@/lib/matchStore';

// Simple in-memory waiting pool
const waitingPool: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const { playerId } = await request.json();
    
    if (!playerId) {
      return NextResponse.json({ error: 'Player ID required' }, { status: 400 });
    }

    // Check if there's someone waiting
    if (waitingPool.length > 0) {
      const waitingPlayerId = waitingPool.shift()!;
      
      // Create match with both players
      const match = await matchStore.createMatch(waitingPlayerId);
      await matchStore.joinMatch(match.matchId, playerId);
      
      return NextResponse.json({ matchId: match.matchId });
    } else {
      // Add to waiting pool
      waitingPool.push(playerId);
      return NextResponse.json({ waiting: true });
    }
  } catch {
    return NextResponse.json({ error: 'Failed to find match' }, { status: 500 });
  }
}