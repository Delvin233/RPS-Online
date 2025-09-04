'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GameState, Choice, Player, Match } from '@/lib/types';
import { determineWinner, generateMatchId } from '@/lib/gameLogic';
import CommitPhase from './CommitPhase';
import RevealPhase from './RevealPhase';
import ResultPhase from './ResultPhase';
import Leaderboard from './Leaderboard';
import BeefLog from './BeefLog';

export default function GameBoard() {
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
    setGameState(prev => ({
      ...prev,
      player1Choice: choice
    }));
  }, []);

  const handlePlayer2Choice = useCallback((choice: Choice) => {
    setGameState(prev => ({
      ...prev,
      player2Choice: choice
    }));
  }, []);

  const startRevealPhase = useCallback(() => {
    if (gameState.player1Choice && gameState.player2Choice) {
      setGameState(prev => ({
        ...prev,
        phase: 'reveal'
      }));
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
      result: result === 'lose' ? 'win' : result, // Adjust for Player 2 perspective
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

  // Auto-advance to reveal when both players have chosen
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
          🎮 RPS ONLINE 🎮
        </h1>
        <p className="text-xl text-gray-300">
          ⚡ Blockchain Beef Settler ⚡
        </p>
      </motion.header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="order-2 lg:order-1">
            <Leaderboard players={gameState.players} />
          </div>

          {/* Main Game Area */}
          <div className="order-1 lg:order-2">
            <motion.div
              key={gameState.phase}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-black/50 rounded-2xl border-4 border-white/20 p-8 backdrop-blur-sm"
            >
              {renderCurrentPhase()}
            </motion.div>
          </div>

          {/* Beef Log */}
          <div className="order-3">
            <BeefLog matches={gameState.matches} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-8 mt-12"
      >
        <p className="text-gray-400">
          🔥 Built for the hackathon • Ready for Web3 integration 🔥
        </p>
      </motion.footer>
    </div>
  );
}