'use client';

import { motion } from 'framer-motion';
import { Player } from '@/lib/types';

interface LeaderboardProps {
  players: Player[];
}

export default function Leaderboard({ players }: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getRankEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'from-yellow-400 to-orange-400';
      case 1: return 'from-gray-300 to-gray-400';
      case 2: return 'from-orange-400 to-yellow-600';
      default: return 'from-blue-400 to-purple-400';
    }
  };

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/80 rounded-2xl border-4 border-cyan-400 p-6 shadow-2xl shadow-cyan-400/30"
      >
        <motion.h2 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
        >
          🏆 LEADERBOARD 🏆
        </motion.h2>

        <div className="space-y-3">
          {sortedPlayers.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="text-xl">🎮 No matches yet!</p>
              <p>Start playing to see rankings</p>
            </div>
          ) : (
            sortedPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  flex items-center justify-between p-4 rounded-lg border-2
                  bg-gradient-to-r ${getRankColor(index)}
                  border-white/20 backdrop-blur-sm
                  ${index === 0 ? 'shadow-lg shadow-yellow-400/30' : ''}
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getRankEmoji(index)}</span>
                  <div>
                    <p className="font-bold text-white text-lg">{player.name}</p>
                    <p className="text-white/80 text-sm">Rank #{index + 1}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{player.score}</p>
                  <p className="text-white/80 text-sm">wins</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {sortedPlayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <span>🎯 Total Matches: {sortedPlayers.reduce((sum, p) => sum + p.score, 0)}</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}