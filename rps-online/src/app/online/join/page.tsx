'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function JoinRoomPage() {
  const { isConnected } = useAccount();
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const joinRoom = async () => {
    if (!roomCode.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/matches/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          matchId: roomCode.trim().toUpperCase(), 
          playerId: Math.random().toString(36).substring(2, 10) 
        })
      });
      const data = await response.json();
      
      if (data.match) {
        router.push(`/online/match/${data.match.matchId}`);
      } else {
        setError(data.error || 'Room not found');
      }
    } catch (error) {
      setError('Failed to join room');
    }
    setLoading(false);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">🚪 JOIN ROOM 🚪</h1>
          <p className="text-gray-300">Please connect your wallet to join a room</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md">
        <h1 className="arcade-font text-4xl text-primary">🚪 JOIN ROOM 🚪</h1>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 bg-black/50 border-2 border-gray-600 rounded-lg text-white text-center arcade-font text-xl focus:border-blue-400 focus:outline-none"
            maxLength={6}
          />
          
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={joinRoom}
            disabled={loading || !roomCode.trim()}
            className="w-full arcade-font px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg border-2 border-blue-400 transition-all text-xl"
          >
            {loading ? '🔄 JOINING...' : '🎯 JOIN ROOM'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}