'use client';

import { useState, useEffect } from 'react';
import MatchLog from '@/components/MatchLog';
import { Match } from '@/lib/types';
import { OnlineMatch } from '@/lib/matchStore';

interface MatchWithMode extends Match {
  mode: 'offline' | 'online';
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchWithMode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Get offline matches from localStorage
        const offlineMatches: MatchWithMode[] = typeof window !== 'undefined' 
          ? JSON.parse(localStorage.getItem('offline-matches') || '[]')
          : [];
        
        // Get online matches from API
        const response = await fetch('/api/matches/completed');
        const data = await response.json();
        
        const onlineMatches: MatchWithMode[] = data.matches ? data.matches.map((match: OnlineMatch) => ({
          id: match.matchId,
          player1: `Player ${match.player1Id?.slice(-4)}`,
          player2: `Player ${match.player2Id?.slice(-4)}`,
          player1Choice: match.player1Choice!,
          player2Choice: match.player2Choice!,
          winner: match.winner ? `Player ${match.winner.slice(-4)}` : null,
          result: match.result!,
          timestamp: new Date(match.completedAt!),
          mode: 'online' as const
        })) : [];
        
        // Combine and sort by timestamp
        const allMatches = [...offlineMatches, ...onlineMatches].sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        
        setMatches(allMatches);
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
        <div className="arcade-font text-primary">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4">
      <div className="container mx-auto max-w-7xl pt-8">
        <MatchLog matches={matches} />
      </div>
    </div>
  );
}