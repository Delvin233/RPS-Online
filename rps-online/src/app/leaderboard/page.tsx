'use client';

import { useState, useEffect } from 'react';
import Leaderboard from '@/components/Leaderboard';
import { Player } from '@/lib/types';
import { OnlineMatch } from '@/lib/matchStore';

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches/completed');
        const data = await response.json();
        
        if (data.matches) {
          const playerStats = new Map<string, { name: string; score: number }>();
          
          data.matches.forEach((match: OnlineMatch) => {
            if (match.winner) {
              const current = playerStats.get(match.winner) || { name: `Player ${match.winner.slice(-4)}`, score: 0 };
              playerStats.set(match.winner, { ...current, score: current.score + 1 });
            }
            
            if (match.player1Id && !playerStats.has(match.player1Id)) {
              playerStats.set(match.player1Id, { name: `Player ${match.player1Id.slice(-4)}`, score: 0 });
            }
            if (match.player2Id && !playerStats.has(match.player2Id)) {
              playerStats.set(match.player2Id, { name: `Player ${match.player2Id.slice(-4)}`, score: 0 });
            }
          });
          
          const playersArray = Array.from(playerStats.entries()).map(([id, stats]) => ({
            id,
            name: stats.name,
            score: stats.score
          }));
          
          setPlayers(playersArray);
        }
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      }
      setLoading(false);
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
        <div className="arcade-font text-primary">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4">
      <div className="container mx-auto max-w-4xl pt-8">
        <div className="flex justify-center">
          <Leaderboard players={players} />
        </div>
      </div>
    </div>
  );
}