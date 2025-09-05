'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWatchContractEvent } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function CreateRoomPage() {
  const { address, isConnected } = useAccount();
  const [matchId, setMatchId] = useState<number | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { writeContract, isPending } = useWriteContract();

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'MatchCreated',
    onLogs(logs) {
      const log = logs.find(l => l.args.creator === address);
      if (log && log.args.matchId) {
        const id = Number(log.args.matchId);
        setMatchId(id);
        setWaiting(true);
      }
    },
  });

  const createRoom = async () => {
    if (!address) return;
    setError('');
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createMatch',
        args: [address], // Create match with self as opponent for now
      });
    } catch (err) {
      setError('Failed to create room');
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">CREATE ROOM</h1>
          <p className="text-gray-300">Please connect your wallet to create a room</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="arcade-font text-4xl text-primary">CREATE ROOM</h1>
        
        {waiting && matchId ? (
          <div className="space-y-6">
            <div className="bg-black/50 rounded-lg p-6 border-2 border-yellow-400">
              <p className="text-gray-300 mb-2">Match ID:</p>
              <p className="arcade-font text-3xl text-yellow-400">{matchId}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/online/match/${matchId}`)}
              className="arcade-font px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg border-2 border-green-400 transition-all text-xl"
            >
              ENTER MATCH
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createRoom}
              disabled={isPending}
              className="arcade-font px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-lg border-2 border-purple-400 transition-all text-xl"
            >
              {isPending ? 'CREATING...' : 'CREATE ROOM'}
            </motion.button>
            {error && <p className="text-red-400">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}