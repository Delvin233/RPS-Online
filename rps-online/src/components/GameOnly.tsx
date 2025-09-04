'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GameState, Choice, Match } from '@/lib/types';
import { determineWinner, generateMatchId } from '@/lib/gameLogic';
import CommitPhase from './CommitPhase';
import RevealPhase from './RevealPhase';
import ResultPhase from './ResultPhase';

export default function GameOnly() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'commit',
    player1Choice: null,
    player2Choice: null,
    currentMatch: null,
    players: [
      { id: 'p1', name: 'Player 1', score: 0 },
      { id: 'p2', name: 'Player 2', score: 0 }
    ],
    matches: []
  });

  const handlePlayer1Choice = useCallback((choice: Choice) => {
    setGameState(prev => ({ ...prev, player1Choice: choice }));
  }, []);

  const handlePlayer2Choice = useCallback((choice: Choice) => {
    setGameState(prev => ({ ...prev, player2Choice: choice }));
  }, []);

  const startRevealPhase = useCallback(() => {
    if (gameState.player1Choice && gameState.player2Choice) {
      setGameState(prev => ({ ...prev, phase: 'reveal' }));
    }
  }, [gameState.player1Choice, gameState.player2Choice]);

  const showResults = useCallback(() => {
    if (!gameState.player1Choice || !gameState.player2Choice) return;

    const result = determineWinner(gameState.player1Choice, gameState.player2Choice);
    let winner: string | null = null;

    if (result === 'win') {
      winner = 'Player 1';
    } else if (result === 'lose') {
      winner = 'Player 2';
    }

    const match: Match = {
      id: generateMatchId(),
      player1: 'Player 1',
      player2: 'Player 2',
      player1Choice: gameState.player1Choice,
      player2Choice: gameState.player2Choice,
      winner,
      result: result === 'lose' ? 'win' : result,
      timestamp: new Date()
    };

    setGameState(prev => ({
      ...prev,
      phase: 'result',
      currentMatch: match,
      matches: [...prev.matches, match],
      players: prev.players.map(player => {
        if (winner === player.name) {
          return { ...player, score: player.score + 1 };
        }
        return player;
      })
    }));
  }, [gameState.player1Choice, gameState.player2Choice]);

  const startNextRound = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'commit',
      player1Choice: null,
      player2Choice: null,
      currentMatch: null
    }));
  }, []);

  if (gameState.phase === 'commit' && gameState.player1Choice && gameState.player2Choice) {
    setTimeout(startRevealPhase, 500);
  }

  const renderCurrentPhase = () => {
    switch (gameState.phase) {
      case 'commit':
        return (
          <CommitPhase
            onPlayer1Choice={handlePlayer1Choice}
            onPlayer2Choice={handlePlayer2Choice}
            player1Ready={!!gameState.player1Choice}
            player2Ready={!!gameState.player2Choice}
          />
        );
      case 'reveal':
        return (
          <RevealPhase
            player1Choice={gameState.player1Choice!}
            player2Choice={gameState.player2Choice!}
            onRevealComplete={showResults}
          />
        );
      case 'result':
        return (
          <ResultPhase
            result={gameState.currentMatch?.result || 'draw'}
            winner={gameState.currentMatch?.winner || null}
            onNextRound={startNextRound}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4">
      <div className="container mx-auto max-w-7xl pt-8">
        <motion.div
          key={gameState.phase}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 200
          }}
          className="arcade-panel rounded-2xl p-4 md:p-8 max-w-6xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-purple-900/5 to-pink-900/5" />
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative z-10">
            {renderCurrentPhase()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}