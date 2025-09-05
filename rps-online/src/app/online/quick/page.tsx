'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWatchContractEvent } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function QuickMatchPage() {
  const { address, isConnected } = useAccount();
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { writeContract, isPending } = useWriteContract();

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'MatchCreated',
    onLogs(logs) {
      const log = logs.find(l => (l as any).args?.creator === address);
      if (log && (log as any).args?.matchId) {
        const matchId = Number((log as any).args.matchId);
        router.push(`/online/match/${matchId}`);
      }
    },
  });

  const findMatch = async () => {
    if (!address) return;
    setSearching(true);
    setError('');
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createMatch',
        args: [address],
      });
    } catch (err) {
      setError('Failed to create match');
      setSearching(false);
    }
  };

  const cancelSearch = () => {
    setSearching(false);
    setError('');
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">QUICK MATCH</h1>
          <p className="text-gray-300">Please connect your wallet to play online</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-4 flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="arcade-font text-4xl text-primary">QUICK MATCH</h1>
        
        {searching || isPending ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl inline-block"
              >
                🔍
              </motion.div>
            </div>
            <p className="text-xl text-gray-300">{isPending ? 'Creating match...' : 'Searching for an opponent...'}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearching(false);
                setError('');
              }}
              disabled={isPending}
              className="arcade-font px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white rounded-lg border-2 border-red-400 transition-all"
            >
              CANCEL
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={findMatch}
              className="arcade-font px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white rounded-lg border-2 border-green-400 transition-all text-xl"
            >
              FIND MATCH
            </motion.button>
            {error && <p className="text-red-400">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}