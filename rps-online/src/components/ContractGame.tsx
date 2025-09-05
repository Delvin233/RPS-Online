'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract, useWatchContractEvent } from 'wagmi';
import { motion } from 'framer-motion';
import { CONTRACT_ADDRESS, CONTRACT_ABI, Move, Phase, generateCommitment, generateSalt } from '@/lib/contract';
import { getChoiceEmoji } from '@/lib/gameLogic';
import { Choice } from '@/lib/types';

interface ContractGameProps {
  matchId: number;
}

export default function ContractGame({ matchId }: ContractGameProps) {
  const { address } = useAccount();
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [salt, setSalt] = useState<string>('');
  const [error, setError] = useState('');
  const { writeContract, isPending } = useWriteContract();

  const { data: matchData, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'matches',
    args: [BigInt(matchId)],
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'MoveCommitted',
    onLogs() {
      refetch();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'MoveRevealed',
    onLogs() {
      refetch();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'MatchResult',
    onLogs() {
      refetch();
    },
  });

  if (!matchData) {
    return <div className="text-center">Loading match...</div>;
  }

  const [player1, player2, commit1, commit2, move1, move2, phase, winner] = matchData as any[];
  const isPlayer1 = address === player1;
  const isPlayer2 = address === player2;
  const currentPhase = Number(phase);

  const commitMove = async (move: Move) => {
    setError('');
    const newSalt = generateSalt();
    const commitment = generateCommitment(move, newSalt);
    
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'commitMove',
        args: [BigInt(matchId), commitment],
      });
      setPlayerMove(move);
      setSalt(newSalt);
    } catch (err) {
      setError('Failed to commit move');
    }
  };

  const revealMove = async () => {
    if (!playerMove || !salt) return;
    setError('');
    
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'revealMove',
        args: [BigInt(matchId), playerMove, salt],
      });
    } catch (err) {
      setError('Failed to reveal move');
    }
  };

  const getChoiceFromMove = (move: number): Choice => {
    switch (move) {
      case 1: return 'rock';
      case 2: return 'paper';
      case 3: return 'scissors';
      default: return 'rock';
    }
  };

  // Commit Phase
  if (currentPhase === Phase.Commit) {
    const hasCommitted = (isPlayer1 && commit1 !== '0x0000000000000000000000000000000000000000000000000000000000000000') ||
                        (isPlayer2 && commit2 !== '0x0000000000000000000000000000000000000000000000000000000000000000');

    if (hasCommitted) {
      return (
        <div className="text-center space-y-6">
          <h2 className="arcade-font text-2xl text-primary">WAITING FOR OPPONENT</h2>
          <div className="text-6xl">{getChoiceEmoji(getChoiceFromMove(playerMove || 1))}</div>
          <p className="text-success">Move committed!</p>
        </div>
      );
    }

    return (
      <div className="text-center space-y-6">
        <h2 className="arcade-font text-2xl text-primary">CHOOSE YOUR MOVE</h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[Move.Rock, Move.Paper, Move.Scissors].map((move) => (
            <motion.button
              key={move}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => commitMove(move)}
              disabled={isPending}
              className="arcade-button p-8 rounded-2xl text-5xl disabled:opacity-50"
            >
              {getChoiceEmoji(getChoiceFromMove(move))}
            </motion.button>
          ))}
        </div>
        {error && <p className="text-red-400">{error}</p>}
      </div>
    );
  }

  // Reveal Phase
  if (currentPhase === Phase.Reveal) {
    const hasRevealed = (isPlayer1 && Number(move1) > 0) || (isPlayer2 && Number(move2) > 0);

    if (hasRevealed) {
      return (
        <div className="text-center space-y-6">
          <h2 className="arcade-font text-2xl text-primary">WAITING FOR OPPONENT TO REVEAL</h2>
          <div className="text-6xl">{getChoiceEmoji(getChoiceFromMove(playerMove || 1))}</div>
          <p className="text-success">Move revealed!</p>
        </div>
      );
    }

    return (
      <div className="text-center space-y-6">
        <h2 className="arcade-font text-2xl text-primary">REVEAL YOUR MOVE</h2>
        <div className="text-6xl">{getChoiceEmoji(getChoiceFromMove(playerMove || 1))}</div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={revealMove}
          disabled={isPending}
          className="arcade-font px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg border-2 border-blue-400 disabled:opacity-50"
        >
          {isPending ? 'REVEALING...' : 'REVEAL MOVE'}
        </motion.button>
        {error && <p className="text-red-400">{error}</p>}
      </div>
    );
  }

  // Result Phase
  if (currentPhase === Phase.Result) {
    const isWinner = winner === address;
    const isDraw = winner === '0x0000000000000000000000000000000000000000';

    return (
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`p-8 rounded-2xl border-2 ${
            isDraw ? 'border-blue-500 bg-blue-900/20' :
            isWinner ? 'border-green-500 bg-green-900/20' :
            'border-red-500 bg-red-900/20'
          }`}
        >
          <h2 className={`arcade-font text-3xl ${
            isDraw ? 'text-primary' :
            isWinner ? 'text-success' : 'text-red-400'
          }`}>
            {isDraw ? 'DRAW!' : isWinner ? 'YOU WIN!' : 'YOU LOSE!'}
          </h2>
        </motion.div>

        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <p className="arcade-font text-primary">PLAYER 1</p>
            <div className="text-6xl mt-2">{getChoiceEmoji(getChoiceFromMove(Number(move1)))}</div>
          </div>
          <div className="text-center">
            <p className="arcade-font text-accent">PLAYER 2</p>
            <div className="text-6xl mt-2">{getChoiceEmoji(getChoiceFromMove(Number(move2)))}</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}