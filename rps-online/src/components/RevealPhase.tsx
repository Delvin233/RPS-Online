'use client';

import { motion } from 'framer-motion';
import { Choice } from '@/lib/types';
import { getChoiceEmoji } from '@/lib/gameLogic';

interface RevealPhaseProps {
  player1Choice: Choice;
  player2Choice: Choice;
  onRevealComplete: () => void;
}

export default function RevealPhase({ 
  player1Choice, 
  player2Choice, 
  onRevealComplete 
}: RevealPhaseProps) {
  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.h2 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400"
      >
        🔥 REVEAL TIME! 🔥
      </motion.h2>

      <div className="flex items-center justify-center space-x-16">
        {/* Player 1 Hand */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold text-yellow-400">Player 1</h3>
          <motion.div
            initial={{ rotateZ: 0, scale: 1 }}
            animate={{ 
              rotateZ: [-5, 5, -5, 0], 
              scale: [1, 1.2, 1.2, 1.5] 
            }}
            transition={{ 
              duration: 2, 
              times: [0, 0.3, 0.6, 1],
              ease: "easeInOut" 
            }}
            className="text-8xl p-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-cyan-400 shadow-2xl shadow-cyan-400/50"
          >
            {getChoiceEmoji(player1Choice)}
          </motion.div>
        </div>

        {/* VS */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-6xl font-bold text-red-400"
        >
          ⚡VS⚡
        </motion.div>

        {/* Player 2 Hand */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold text-cyan-400">Player 2</h3>
          <motion.div
            initial={{ rotateZ: 0, scale: 1 }}
            animate={{ 
              rotateZ: [5, -5, 5, 0], 
              scale: [1, 1.2, 1.2, 1.5] 
            }}
            transition={{ 
              duration: 2, 
              times: [0, 0.3, 0.6, 1],
              ease: "easeInOut" 
            }}
            className="text-8xl p-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 border-4 border-yellow-400 shadow-2xl shadow-yellow-400/50"
          >
            {getChoiceEmoji(player2Choice)}
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRevealComplete}
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-lg border-2 border-white hover:shadow-lg hover:shadow-green-400/50 transition-all"
      >
        🎯 SEE RESULTS 🎯
      </motion.button>
    </div>
  );
}