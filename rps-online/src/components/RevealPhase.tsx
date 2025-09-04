'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Choice } from '@/lib/types';
import { getChoiceEmoji } from '@/lib/gameLogic';
import { soundManager } from '@/lib/soundManager';

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
  useEffect(() => {
    soundManager.play('drumroll');
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.h2 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="arcade-font text-2xl md:text-3xl text-primary text-center"
      >
        🔥 REVEAL TIME! 🔥
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-center justify-center space-y-12 lg:space-y-0 lg:space-x-20 p-4">
        {/* Player 1 Hand */}
        <div className="flex flex-col items-center space-y-6">
          <h3 className="arcade-font text-lg text-primary">PLAYER 1</h3>
          <motion.div
            initial={{ y: -100, scale: 0.8, opacity: 0 }}
            animate={{ 
              y: 0,
              scale: 1.1,
              opacity: 1
            }}
            transition={{ 
              duration: 1.2, 
              ease: "backOut"
            }}
            className="text-7xl md:text-9xl p-6 md:p-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-blue-500 shadow-xl hand-bounce"
          >
            {getChoiceEmoji(player1Choice)}
          </motion.div>
        </div>

        {/* VS */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1
          }}
          transition={{ delay: 0.8, duration: 0.5, ease: "backOut" }}
          className="arcade-font text-3xl md:text-5xl text-accent order-2 lg:order-1"
        >
          ⚡VS⚡
        </motion.div>

        {/* Player 2 Hand */}
        <div className="flex flex-col items-center space-y-6 order-3 lg:order-2">
          <h3 className="arcade-font text-lg text-accent">PLAYER 2</h3>
          <motion.div
            initial={{ y: -100, scale: 0.8, opacity: 0 }}
            animate={{ 
              y: 0,
              scale: 1.1,
              opacity: 1
            }}
            transition={{ 
              duration: 1.2, 
              ease: "backOut"
            }}
            className="text-7xl md:text-9xl p-6 md:p-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-cyan-500 shadow-xl hand-bounce"
          >
            {getChoiceEmoji(player2Choice)}
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRevealComplete}
        className="arcade-font px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg border-2 border-blue-400 hover:shadow-lg transition-all"
      >
        🎯 SEE RESULTS 🎯
      </motion.button>
    </div>
  );
}