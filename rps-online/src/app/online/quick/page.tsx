'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function QuickMatchPage() {
  const { isConnected } = useAccount();
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  const findMatch = async () => {
    setSearching(true);
    try {
      const response = await fetch('/api/matches/quick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: Math.random().toString(36).substring(2, 10) })
      });
      const data = await response.json();
      if (data.matchId) {
        router.push(`/online/match/${data.matchId}`);
      }
    } catch (error) {
      console.error('Failed to find match:', error);
      setSearching(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">⚡ QUICK MATCH ⚡</h1>
          <p className="text-gray-300">Please connect your wallet to play online</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="arcade-font text-4xl text-primary">⚡ QUICK MATCH ⚡</h1>
        
        {searching ? (
          <div className="space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl"
            >
              🔍
            </motion.div>
            <p className="text-xl text-gray-300">Searching for an opponent...</p>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={findMatch}
            className="arcade-font px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white rounded-lg border-2 border-green-400 transition-all text-xl"
          >
            🎯 FIND MATCH
          </motion.button>
        )}
      </div>
    </div>
  );
}