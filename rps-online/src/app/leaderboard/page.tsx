'use client';

import { useState } from 'react';
import Leaderboard from '@/components/Leaderboard';
import { Player } from '@/lib/types';

export default function LeaderboardPage() {
  // Mock data for demonstration
  const [players] = useState<Player[]>([
    { id: 'p1', name: 'Player 1', score: 5 },
    { id: 'p2', name: 'Player 2', score: 3 },
    { id: 'p3', name: 'Player 3', score: 8 },
    { id: 'p4', name: 'Player 4', score: 1 }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Leaderboard players={players} />
      </div>
    </div>
  );
}