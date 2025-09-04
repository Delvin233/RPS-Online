'use client';

import { motion } from 'framer-motion';
import { Match } from '@/lib/types';
import { getChoiceEmoji } from '@/lib/gameLogic';

interface MatchWithMode extends Match {
  mode?: 'offline' | 'online';
}

interface MatchLogProps {
  matches: MatchWithMode[];
}

export default function MatchLog({ matches }: MatchLogProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getResultIcon = (match: Match) => {
    if (match.result === 'draw') return '🤝';
    return match.winner === match.player1 ? '🏆' : '💀';
  };

  const getResultColor = (match: Match) => {
    if (match.result === 'draw') return 'border-blue-400 bg-blue-900/20';
    return match.winner === match.player1 
      ? 'border-green-400 bg-green-900/20' 
      : 'border-red-400 bg-red-900/20';
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="arcade-panel rounded-2xl p-6 h-96 relative overflow-hidden"
        style={{ borderColor: 'var(--accent-cyan)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-purple-900/10" />
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative z-10 h-full flex flex-col">
          <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="arcade-font text-xl md:text-2xl text-center mb-6 text-accent"
          >
            📜 MATCH LOG 📜
          </motion.h2>

        <div className="overflow-y-auto h-72 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {matches.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="text-xl">🎮 No matches yet!</p>
              <p>Play some games to build history</p>
            </div>
          ) : (
            matches.slice().reverse().map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  p-3 rounded-lg border-2 transition-all backdrop-blur-sm
                  ${getResultColor(match)}
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">{formatTime(match.timestamp)}</span>
                    {match.mode && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        match.mode === 'offline' 
                          ? 'bg-gray-600 text-gray-200' 
                          : 'bg-blue-600 text-blue-200'
                      }`}>
                        {match.mode === 'offline' ? '🎮' : '🌐'}
                      </span>
                    )}
                  </div>
                  <span className="text-xl">{getResultIcon(match)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="arcade-font text-yellow-400 text-xs">{match.player1}</span>
                    <span className="text-xl">{getChoiceEmoji(match.player1Choice)}</span>
                  </div>

                  <span className="arcade-font text-white text-xs">VS</span>

                  <div className="flex items-center space-x-1">
                    <span className="text-xl">{getChoiceEmoji(match.player2Choice)}</span>
                    <span className="arcade-font text-cyan-400 text-xs">{match.player2}</span>
                  </div>
                </div>

                <div className="text-center mt-2">
                  {match.result === 'draw' ? (
                    <span className="arcade-font text-blue-400 text-xs">DRAW!</span>
                  ) : (
                    <span className="arcade-font text-white text-xs">
                      {match.winner} WINS!
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
          </div>
        </div>

          {matches.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center text-xs text-gray-400 arcade-font"
            >
              📊 Total: {matches.length}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}