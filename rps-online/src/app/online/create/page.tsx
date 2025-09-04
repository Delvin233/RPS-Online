'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CreateRoomPage() {
  const { isConnected } = useAccount();
  const [roomCode, setRoomCode] = useState('');
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();

  const createRoom = async () => {
    try {
      const response = await fetch('/api/matches/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: Math.random().toString(36).substring(2, 10) })
      });
      const data = await response.json();
      if (data.match) {
        setRoomCode(data.match.matchId);
        setWaiting(true);
        // Poll for opponent
        const interval = setInterval(async () => {
          const checkResponse = await fetch(`/api/matches/${data.match.matchId}`);
          const checkData = await checkResponse.json();
          if (checkData.match && checkData.match.player2Id) {
            clearInterval(interval);
            router.push(`/online/match/${data.match.matchId}`);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">🏠 CREATE ROOM 🏠</h1>
          <p className="text-gray-300">Please connect your wallet to create a room</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="arcade-font text-4xl text-primary">🏠 CREATE ROOM 🏠</h1>
        
        {waiting ? (
          <div className="space-y-6">
            <div className="bg-black/50 rounded-lg p-6 border-2 border-yellow-400">
              <p className="text-gray-300 mb-2">Room Code:</p>
              <p className="arcade-font text-3xl text-yellow-400">{roomCode}</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-4xl"
            >
              ⏳
            </motion.div>
            <p className="text-xl text-gray-300">Waiting for opponent to join...</p>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={createRoom}
            className="arcade-font px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg border-2 border-purple-400 transition-all text-xl"
          >
            🎮 CREATE ROOM
          </motion.button>
        )}
      </div>
    </div>
  );
}