'use client';

import { motion } from 'framer-motion';
import { Match } from '@/lib/types';
import { getChoiceEmoji } from '@/lib/gameLogic';

interface MatchLogProps {
  matches: Match[];
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
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/80 rounded-2xl border-4 border-purple-400 p-6 shadow-2xl shadow-purple-400/30 h-96"
      >
        <motion.h2 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
        >
          📜 MATCH LOG 📜
        </motion.h2>

        <div className="overflow-y-auto h-72 space-y-3 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-800">
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
                  p-4 rounded-lg border-2 transition-all
                  ${getResultColor(match)}
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{formatTime(match.timestamp)}</span>
                  <span className="text-xl">{getResultIcon(match)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-yellow-400 text-sm">{match.player1}</span>
                    <span className="text-2xl">{getChoiceEmoji(match.player1Choice)}</span>
                  </div>

                  <span className="text-white font-bold">VS</span>

                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getChoiceEmoji(match.player2Choice)}</span>
                    <span className="font-bold text-cyan-400 text-sm">{match.player2}</span>
                  </div>
                </div>

                <div className="text-center mt-2">
                  {match.result === 'draw' ? (
                    <span className="text-blue-400 font-bold text-sm">DRAW!</span>
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {match.winner} WINS!
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-center text-xs text-gray-400"
          >
            📊 Total Matches: {matches.length}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}