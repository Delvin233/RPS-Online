import { NextRequest, NextResponse } from 'next/server';
import { matchStore } from '@/lib/matchStore';

export async function POST(request: NextRequest) {
  try {
    const { playerId } = await request.json();
    
    console.log('Create match request:', { playerId });
    
    if (!playerId) {
      return NextResponse.json({ error: 'Player ID required' }, { status: 400 });
    }

    const match = await matchStore.createMatch(playerId);
    console.log('Created match:', match);
    return NextResponse.json({ match });
  } catch (error) {
    console.error('Create match error:', error);
    return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
  }
}