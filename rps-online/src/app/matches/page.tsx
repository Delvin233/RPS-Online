'use client';

import { useState } from 'react';
import MatchLog from '@/components/MatchLog';
import { Match } from '@/lib/types';

export default function MatchesPage() {
  // Mock data for demonstration
  const [matches] = useState<Match[]>([
    {
      id: '1',
      player1: 'Player 1',
      player2: 'Player 2',
      player1Choice: 'rock',
      player2Choice: 'scissors',
      winner: 'Player 1',
      result: 'win',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      player1: 'Player 2',
      player2: 'Player 3',
      player1Choice: 'paper',
      player2Choice: 'paper',
      winner: null,
      result: 'draw',
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: '3',
      player1: 'Player 3',
      player2: 'Player 1',
      player1Choice: 'scissors',
      player2Choice: 'rock',
      winner: 'Player 1',
      result: 'lose',
      timestamp: new Date(Date.now() - 900000)
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <MatchLog matches={matches} />
      </div>
    </div>
  );
}