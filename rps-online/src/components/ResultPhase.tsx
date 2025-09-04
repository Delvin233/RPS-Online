'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { GameResult } from '@/lib/types';
import { soundManager } from '@/lib/soundManager';

interface ResultPhaseProps {
  result: GameResult;
  winner: string | null;
  onNextRound: () => void;
}

export default function ResultPhase({ result, winner, onNextRound }: ResultPhaseProps) {
  useEffect(() => {
    switch (result) {
      case 'win':
      case 'lose':
        soundManager.play(winner ? 'victory' : 'defeat');
        break;
      case 'draw':
        soundManager.play('draw');
        break;
    }
  }, [result, winner]);

  const getResultConfig = () => {
    switch (result) {
      case 'win':
      case 'lose':
        const isVictory = winner !== null;
        return {
          title: isVictory ? '🏆 VICTORY! 🏆' : '💀 DEFEAT! 💀',
          subtitle: `${winner} WINS!`,
          colors: isVictory ? 'from-green-600 to-green-800' : 'from-red-600 to-red-800',
          bgGlow: isVictory ? 'shadow-green-500/50' : 'shadow-red-500/50',
          emoji: isVictory ? '🎉' : '😵',
          textClass: isVictory ? 'text-success' : 'text-red-400',
          isVictory
        };
      case 'draw':
        return {
          title: '🤝 DRAW! 🤝',
          subtitle: 'IT\'S A TIE!',
          colors: 'from-blue-400 via-purple-400 to-cyan-400',
          bgGlow: 'shadow-blue-400/70',
          emoji: '🤷‍♂️',
          neonClass: 'neon-blue'
        };
    }
  };

  const config = getResultConfig();

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1.02
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 10
        }}
        className={`
          p-8 rounded-2xl border-2 border-gray-300 
          bg-gradient-to-br ${config.colors} 
          shadow-xl ${config.isVictory ? 'victory-glow' : ''}
        `}
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ 
            delay: 0.5,
            scale: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' }
          }}
          className={`arcade-font text-4xl text-center mb-4 ${config.textClass}`}
        >
          {config.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="arcade-font text-lg text-white text-center"
        >
          {config.subtitle}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1.5, 
          rotate: 360,
          y: -10
        }}
        transition={{ 
          delay: 1, 
          duration: 1.2,
          type: "spring",
          stiffness: 200
        }}
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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNextRound}
          className="arcade-font px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg border-2 border-blue-400 hover:shadow-lg transition-all"
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