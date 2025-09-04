'use client';

import { motion } from 'framer-motion';
import { Choice } from '@/lib/types';
import { getChoiceEmoji } from '@/lib/gameLogic';

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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        p-6 rounded-xl text-4xl font-bold border-2 transition-all
        ${disabled 
          ? 'bg-gray-600 border-gray-500 cursor-not-allowed opacity-50' 
          : 'bg-gradient-to-br from-purple-600 to-pink-600 border-cyan-400 hover:border-yellow-400 hover:shadow-lg hover:shadow-cyan-400/50'
        }
      `}
    >
      {getChoiceEmoji(choice)}
    </motion.button>
  );

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
      >
        🎮 COMMIT YOUR MOVES! 🎮
      </motion.h2>

      <div className="grid grid-cols-2 gap-12 w-full max-w-4xl">
        {/* Player 1 */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold text-yellow-400">Player 1</h3>
          <div className={`
            p-4 rounded-lg border-2 transition-all
            ${player1Ready 
              ? 'border-green-400 bg-green-900/30 shadow-lg shadow-green-400/30' 
              : 'border-red-400 bg-red-900/30'
            }
          `}>
            {player1Ready ? '✅ READY!' : '⏳ Waiting...'}
          </div>
          <div className="grid grid-cols-3 gap-4">
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
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold text-cyan-400">Player 2</h3>
          <div className={`
            p-4 rounded-lg border-2 transition-all
            ${player2Ready 
              ? 'border-green-400 bg-green-900/30 shadow-lg shadow-green-400/30' 
              : 'border-red-400 bg-red-900/30'
            }
          `}>
            {player2Ready ? '✅ READY!' : '⏳ Waiting...'}
          </div>
          <div className="grid grid-cols-3 gap-4">
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