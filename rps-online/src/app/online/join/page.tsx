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
      const matchId = parseInt(roomCode.trim());
      if (isNaN(matchId)) {
        setError('Please enter a valid match ID (number)');
        setLoading(false);
        return;
      }
      
      // Navigate directly to match page
      router.push(`/online/match/${matchId}`);
    } catch (error) {
      setError('Failed to join room');
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">JOIN MATCH</h1>
          <p className="text-gray-300">Please connect your wallet to join a match</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-4 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md">
        <h1 className="arcade-font text-4xl text-primary">JOIN MATCH</h1>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Match ID"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="w-full px-4 py-3 bg-blue-950/50 border-2 border-blue-600 rounded-lg text-white text-center arcade-font text-xl focus:border-cyan-400 focus:outline-none backdrop-blur-sm"
            maxLength={10}
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
            {loading ? 'JOINING...' : 'JOIN MATCH'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}