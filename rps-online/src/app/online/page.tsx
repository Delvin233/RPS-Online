'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import OnlineGame from '@/components/OnlineGame';

export default function OnlinePage() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="arcade-font text-4xl text-primary"
          >
            🌐 ONLINE MODE 🌐
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Connect your wallet to play online multiplayer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ConnectButton />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4">
      <div className="container mx-auto max-w-4xl pt-8">
        <div className="arcade-panel rounded-2xl p-4 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-purple-900/5 to-pink-900/5" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="relative z-10">
            <OnlineGame />
          </div>
        </div>
      </div>
    </div>
  );
}