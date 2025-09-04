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
        className="arcade-panel rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-pink-900/10" />
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative z-10">
          <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="arcade-font text-xl md:text-2xl text-center mb-6 text-primary"
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
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200
                }}
                className={`
                  flex items-center justify-between p-4 rounded-lg border-2
                  bg-gradient-to-r ${getRankColor(index)}
                  ${index === 0 ? 'border-green-500 shadow-lg shadow-green-500/30 victory-glow' : 
                    index === 1 ? 'border-gray-400 shadow-lg shadow-gray-400/20' :
                    index === 2 ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' :
                    'border-blue-400 shadow-lg shadow-blue-400/20'}
                  backdrop-blur-sm relative overflow-hidden
                `}
              >
                {index === 0 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.span 
                    className="text-3xl"
                    animate={index === 0 ? { 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {getRankEmoji(index)}
                  </motion.span>
                  <div>
                    <p className="arcade-font text-white text-sm md:text-base">{player.name}</p>
                    <p className="text-white/60 text-xs">RANK #{index + 1}</p>
                  </div>
                </div>
                
                <div className="text-right relative z-10">
                  <motion.p 
                    className="arcade-font text-xl md:text-2xl font-bold text-white score-flash"
                    key={`${player.id}-${player.score}`}
                  >
                    {player.score}
                  </motion.p>
                  <p className="text-white/60 text-xs">WINS</p>
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
              <div className="flex justify-center space-x-4 text-sm text-gray-400 arcade-font">
                <span>🎯 Total: {sortedPlayers.reduce((sum, p) => sum + p.score, 0)}</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}