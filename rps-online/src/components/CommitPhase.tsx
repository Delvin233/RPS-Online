'use client';

import { motion } from 'framer-motion';
import { Choice } from '@/lib/types';
import { getChoiceEmoji } from '@/lib/gameLogic';
import { soundManager } from '@/lib/soundManager';

interface CommitPhaseProps {
  onPlayer1Choice: (choice: Choice) => void;
  onPlayer2Choice: (choice: Choice) => void;
  player1Ready: boolean;
  player2Ready: boolean;
}

export default function CommitPhase({ 
  onPlayer1Choice, 
  onPlayer2Choice, 
  player1Ready, 
  player2Ready 
}: CommitPhaseProps) {
  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const ChoiceButton = ({ 
    choice, 
    onClick, 
    disabled 
  }: { 
    choice: Choice; 
    onClick: () => void; 
    disabled: boolean; 
  }) => (
    <motion.button
      whileHover={!disabled ? { 
        scale: 1.1,
        y: -5
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative p-8 rounded-2xl text-5xl transition-all duration-300
        ${disabled 
          ? 'bg-gray-900 border-4 border-gray-600 cursor-not-allowed opacity-50' 
          : 'arcade-button hover:arcade-button'
        }
      `}
    >
      <div className="relative z-10">{getChoiceEmoji(choice)}</div>
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rounded-2xl"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </motion.button>
  );

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="arcade-font text-2xl md:text-3xl text-primary text-center"
      >
        🎮 COMMIT YOUR MOVES! 🎮
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Player 1 */}
        <div className="flex flex-col items-center space-y-6">
          <h3 className="arcade-font text-lg text-primary">PLAYER 1</h3>
          <motion.div 
            animate={player1Ready ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`
              px-6 py-3 rounded-lg border-2 transition-all arcade-font text-sm
              ${player1Ready 
                ? 'border-green-500 bg-green-900/20 text-success' 
                : 'border-red-500 bg-red-900/20 text-red-400'
              }
            `}
          >
            {player1Ready ? '✅ READY!' : '⏳ WAITING...'}
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
            {choices.map((choice) => (
              <ChoiceButton
                key={`p1-${choice}`}
                choice={choice}
                onClick={() => onPlayer1Choice(choice)}
                disabled={player1Ready}
              />
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex flex-col items-center space-y-6">
          <h3 className="arcade-font text-lg text-accent">PLAYER 2</h3>
          <motion.div 
            animate={player2Ready ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`
              px-6 py-3 rounded-lg border-2 transition-all arcade-font text-sm
              ${player2Ready 
                ? 'border-green-500 bg-green-900/20 text-success' 
                : 'border-red-500 bg-red-900/20 text-red-400'
              }
            `}
          >
            {player2Ready ? '✅ READY!' : '⏳ WAITING...'}
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
            {choices.map((choice) => (
              <ChoiceButton
                key={`p2-${choice}`}
                choice={choice}
                onClick={() => onPlayer2Choice(choice)}
                disabled={player2Ready}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}