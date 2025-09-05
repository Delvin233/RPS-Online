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

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">QUICK MATCH</h1>
          <p className="text-gray-300">Please connect your wallet to play online</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="arcade-font text-4xl text-primary">QUICK MATCH</h1>
        
        {searching || isPending ? (
          <div className="space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl"
            >
              🔍
            </motion.div>
            <p className="text-xl text-gray-300">{isPending ? 'Creating match...' : 'Searching for an opponent...'}</p>
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