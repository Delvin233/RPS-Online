'use client';

import { motion } from 'framer-motion';

interface GameStateIndicatorProps {
  state: 'waiting' | 'choosing' | 'committed' | 'revealing' | 'completed';
  playerChoice?: string;
}

export default function GameStateIndicator({ state, playerChoice }: GameStateIndicatorProps) {
  const getStateConfig = () => {
    switch (state) {
      case 'waiting':
        return {
          color: 'text-yellow-400',
          bg: 'bg-yellow-900/20 border-yellow-500/30',
          icon: '⏳',
          text: 'Waiting for opponent...'
        };
      case 'choosing':
        return {
          color: 'text-blue-400',
          bg: 'bg-blue-900/20 border-blue-500/30',
          icon: '🤔',
          text: 'Choose your move'
        };
      case 'committed':
        return {
          color: 'text-green-400',
          bg: 'bg-green-900/20 border-green-500/30',
          icon: '✅',
          text: 'Move committed'
        };
      case 'revealing':
        return {
          color: 'text-purple-400',
          bg: 'bg-purple-900/20 border-purple-500/30',
          icon: '🎭',
          text: 'Ready to reveal'
        };
      case 'completed':
        return {
          color: 'text-cyan-400',
          bg: 'bg-cyan-900/20 border-cyan-500/30',
          icon: '🏁',
          text: 'Game completed'
        };
      default:
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-900/20 border-gray-500/30',
          icon: '❓',
          text: 'Unknown state'
        };
    }
  };

  const config = getStateConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${config.bg} ${config.color}`}
    >
      <motion.span
        animate={{ rotate: state === 'waiting' ? 360 : 0 }}
        transition={{ duration: 2, repeat: state === 'waiting' ? Infinity : 0, ease: "linear" }}
      >
        {config.icon}
      </motion.span>
      <span className="text-sm font-medium">{config.text}</span>
      {playerChoice && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-2 text-lg"
        >
          {playerChoice}
        </motion.span>
      )}
    </motion.div>
  );
}