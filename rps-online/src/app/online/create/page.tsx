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
      console.log('MatchCreated event received:', logs);
      const log = logs.find(l => (l as any).args?.creator === address);
      if (log && (log as any).args?.matchId) {
        const id = Number((log as any).args.matchId);
        console.log('Match created with ID:', id);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">CREATE ROOM</h1>
          <p className="text-gray-300">Please connect your wallet to create a room</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-4 flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="arcade-font text-4xl text-primary">CREATE ROOM</h1>
        
        {waiting && matchId ? (
          <div className="space-y-6">
            <div className="bg-black/50 rounded-lg p-6 border-2 border-yellow-400">
              <p className="text-gray-300 mb-2">Share this Match ID with your opponent:</p>
              <div className="flex items-center justify-center space-x-4">
                <p className="arcade-font text-3xl text-yellow-400">{matchId}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigator.clipboard.writeText(matchId.toString());
                    alert('Match ID copied to clipboard!');
                  }}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm"
                >
                  COPY
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/online/match/${matchId}`)}
                className="arcade-font px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg border-2 border-green-400 transition-all text-xl"
              >
                ENTER MATCH
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMatchId(null);
                  setWaiting(false);
                  setError('');
                }}
                className="arcade-font px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white rounded-lg border-2 border-gray-400 transition-all text-xl"
              >
                CREATE NEW MATCH
              </motion.button>
            </div>
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