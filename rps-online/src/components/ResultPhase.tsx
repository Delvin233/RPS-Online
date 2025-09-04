'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { GameResult } from '@/lib/types';

interface ResultPhaseProps {
  result: GameResult;
  winner: string | null;
  onNextRound: () => void;
}

export default function ResultPhase({ result, winner, onNextRound }: ResultPhaseProps) {
  useEffect(() => {
    // Placeholder for sound effects
    const playSound = (type: string) => {
      console.log(`🔊 Playing ${type} sound effect`);
      // TODO: Implement Howler.js sounds
    };

    switch (result) {
      case 'win':
        playSound('victory');
        break;
      case 'lose':
        playSound('defeat');
        break;
      case 'draw':
        playSound('draw');
        break;
    }
  }, [result]);

  const getResultConfig = () => {
    switch (result) {
      case 'win':
        return {
          title: '🏆 VICTORY! 🏆',
          subtitle: `${winner} WINS!`,
          colors: 'from-yellow-400 to-orange-400',
          bgGlow: 'shadow-yellow-400/50',
          emoji: '🎉'
        };
      case 'lose':
        return {
          title: '💀 DEFEAT! 💀',
          subtitle: `${winner} WINS!`,
          colors: 'from-red-400 to-pink-400',
          bgGlow: 'shadow-red-400/50',
          emoji: '😵'
        };
      case 'draw':
        return {
          title: '🤝 DRAW! 🤝',
          subtitle: 'IT\'S A TIE!',
          colors: 'from-blue-400 to-purple-400',
          bgGlow: 'shadow-blue-400/50',
          emoji: '🤷‍♂️'
        };
    }
  };

  const config = getResultConfig();

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className={`
          p-8 rounded-2xl border-4 border-white 
          bg-gradient-to-br ${config.colors} 
          shadow-2xl ${config.bgGlow}
        `}
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-bold text-white text-center mb-4"
        >
          {config.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-2xl font-bold text-white text-center"
        >
          {config.subtitle}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-8xl"
      >
        {config.emoji}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="flex space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextRound}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-lg border-2 border-white hover:shadow-lg hover:shadow-green-400/50 transition-all"
        >
          🎮 NEXT ROUND 🎮
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center text-gray-400"
      >
        <p>🔊 Sound effects: {result === 'win' ? 'Victory fanfare!' : result === 'lose' ? 'Sad trombone!' : 'Draw sound!'}</p>
      </motion.div>
    </div>
  );
}