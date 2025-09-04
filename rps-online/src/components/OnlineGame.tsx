'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Choice } from '@/lib/types';
import { OnlineMatch } from '@/lib/matchStore';
import { getChoiceEmoji } from '@/lib/gameLogic';

export default function OnlineGame() {
  const [playerId] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('rps-playerId');
      if (stored) return stored;
    }
    const id = Math.random().toString(36).substring(2, 10);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rps-playerId', id);
    }
    return id;
  });
  const [match, setMatch] = useState<OnlineMatch | null>(null);
  const [matchId, setMatchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const restoreMatch = async () => {
      if (typeof window === 'undefined') return;
      const storedMatchId = localStorage.getItem('rps-currentMatch');
      if (storedMatchId) {
        try {
          const response = await fetch(`/api/matches/${storedMatchId}`);
          const data = await response.json();
          if (data.match && data.match.status !== 'completed') {
            setMatch(data.match);
            setMatchId(storedMatchId);
          } else {
            localStorage.removeItem('rps-currentMatch');
          }
        } catch {
          localStorage.removeItem('rps-currentMatch');
        }
      }
    };
    restoreMatch();
  }, []);

  const createMatch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/matches/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId })
      });
      const data = await response.json();
      if (data.match) {
        setMatch(data.match);
        setMatchId(data.match.matchId);
        localStorage.setItem('rps-currentMatch', data.match.matchId);
      } else {
        setError(data.error || 'Failed to create match');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  const joinMatch = async () => {
    if (!matchId.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/matches/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId: matchId.trim().toUpperCase(), playerId })
      });
      const data = await response.json();
      if (data.match) {
        setMatch(data.match);
        localStorage.setItem('rps-currentMatch', data.match.matchId);
      } else {
        setError(data.error || 'Failed to join match');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  const commitMove = async (choice: Choice) => {
    if (!match) return;
    try {
      const response = await fetch('/api/matches/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId: match.matchId, playerId, choice })
      });
      const data = await response.json();
      if (data.match) {
        setMatch(data.match);
      }
    } catch {
      setError('Failed to commit move');
    }
  };

  const revealMove = async () => {
    if (!match) return;
    try {
      const response = await fetch('/api/matches/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId: match.matchId, playerId })
      });
      const data = await response.json();
      if (data.match) {
        setMatch(data.match);
      }
    } catch {
      setError('Failed to reveal move');
    }
  };

  const cancelMatch = async () => {
    if (!match) return;
    try {
      await fetch('/api/matches/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId: match.matchId, playerId })
      });
      setMatch(null);
      setMatchId('');
      setError('');
      localStorage.removeItem('rps-currentMatch');
    } catch {
      setError('Failed to cancel match');
    }
  };

  const pollMatch = useCallback(async () => {
    if (!match) return;
    try {
      const response = await fetch(`/api/matches/${match.matchId}`);
      const data = await response.json();
      if (data.match) {
        setMatch(data.match);
      }
    } catch {
      // Silent fail for polling
    }
  }, [match]);

  useEffect(() => {
    if (match && match.status !== 'completed') {
      const interval = setInterval(pollMatch, 2000);
      return () => clearInterval(interval);
    }
  }, [match, pollMatch]);

  const isPlayer1 = match?.player1Id === playerId;
  const playerChoice = isPlayer1 ? match?.player1Choice : match?.player2Choice;
  const playerRevealed = isPlayer1 ? match?.player1Revealed : match?.player2Revealed;

  if (!match) {
    return (
      <div className="flex flex-col items-center space-y-8 p-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="arcade-font text-2xl md:text-3xl text-primary text-center"
        >
          🌐 ONLINE MULTIPLAYER 🌐
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl">
          <div className="flex-1 space-y-4">
            <h3 className="arcade-font text-lg text-accent text-center">CREATE MATCH</h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createMatch}
              disabled={loading}
              className="w-full arcade-button px-6 py-4 rounded-lg text-white arcade-font"
            >
              {loading ? 'CREATING...' : 'CREATE NEW MATCH'}
            </motion.button>
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="arcade-font text-lg text-accent text-center">JOIN MATCH</h3>
            <input
              type="text"
              placeholder="Enter Match ID"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-blue-500 rounded-lg text-white arcade-font text-center"
              maxLength={6}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={joinMatch}
              disabled={loading || !matchId.trim()}
              className="w-full arcade-button px-6 py-4 rounded-lg text-white arcade-font"
            >
              {loading ? 'JOINING...' : 'JOIN MATCH'}
            </motion.button>
          </div>
        </div>

        {error && (
          <div className="text-red-400 arcade-font text-center">{error}</div>
        )}
      </div>
    );
  }

  if (match.status === 'waiting') {
    return (
      <div className="flex flex-col items-center space-y-8 p-8">
        <motion.h2 className="arcade-font text-2xl text-primary text-center">
          WAITING FOR OPPONENT
        </motion.h2>
        <div className="text-center">
          <p className="arcade-font text-lg text-accent">Match ID: {match.matchId}</p>
          <p className="text-gray-400 mt-2">Share this ID with your opponent</p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-4xl"
        >
          ⏳
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={cancelMatch}
          className="arcade-font px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg border-2 border-red-400 transition-all"
        >
          ❌ CANCEL MATCH
        </motion.button>
      </div>
    );
  }

  if (match.status === 'ready' || match.status === 'committed') {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const bothCommitted = match.player1Choice && match.player2Choice;

    return (
      <div className="flex flex-col items-center space-y-8 p-8">
        <motion.h2 className="arcade-font text-2xl text-primary text-center">
          {playerChoice ? 'WAITING FOR OPPONENT' : 'CHOOSE YOUR MOVE'}
        </motion.h2>

        <div className="text-center">
          <p className="arcade-font text-lg text-accent">Match ID: {match.matchId}</p>
          <p className="text-gray-400">You are Player {isPlayer1 ? '1' : '2'}</p>
        </div>

        {!playerChoice && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
            {choices.map((choice) => (
              <motion.button
                key={choice}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => commitMove(choice)}
                className="arcade-button p-8 rounded-2xl text-5xl"
              >
                {getChoiceEmoji(choice)}
              </motion.button>
            ))}
          </div>
        )}

        {playerChoice && (
          <div className="text-center">
            <p className="arcade-font text-success">✅ MOVE COMMITTED!</p>
            <div className="text-6xl mt-4">{getChoiceEmoji(playerChoice)}</div>
          </div>
        )}

        {bothCommitted && !playerRevealed && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={revealMove}
            className="arcade-font px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg border-2 border-blue-400"
          >
            🎯 REVEAL MOVES 🎯
          </motion.button>
        )}
      </div>
    );
  }

  if (match.status === 'completed') {
    const isWinner = match.winner === playerId;
    const isDraw = match.result === 'draw';

    return (
      <div className="flex flex-col items-center space-y-8 p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`p-8 rounded-2xl border-2 ${
            isDraw ? 'border-blue-500 bg-blue-900/20' :
            isWinner ? 'border-green-500 bg-green-900/20 victory-glow' :
            'border-red-500 bg-red-900/20'
          }`}
        >
          <h2 className={`arcade-font text-3xl text-center ${
            isDraw ? 'text-primary' :
            isWinner ? 'text-success' : 'text-red-400'
          }`}>
            {isDraw ? '🤝 DRAW!' : isWinner ? '🏆 YOU WIN!' : '💀 YOU LOSE!'}
          </h2>
        </motion.div>

        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <p className="arcade-font text-primary">PLAYER 1</p>
            <div className="text-6xl mt-2">{getChoiceEmoji(match.player1Choice!)}</div>
          </div>
          <div className="text-center">
            <p className="arcade-font text-accent">PLAYER 2</p>
            <div className="text-6xl mt-2">{getChoiceEmoji(match.player2Choice!)}</div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setMatch(null);
            setMatchId('');
            setError('');
            localStorage.removeItem('rps-currentMatch');
          }}
          className="arcade-font px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg border-2 border-blue-400"
        >
          🎮 NEW MATCH 🎮
        </motion.button>
      </div>
    );
  }

  return null;
}