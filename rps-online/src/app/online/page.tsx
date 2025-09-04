'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function OnlinePage() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">PLAY ONLINE</h1>
          <p className="text-gray-300 text-lg">Connect your wallet to play online multiplayer</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4">
      <div className="container mx-auto max-w-4xl pt-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="arcade-font text-5xl text-center text-primary mb-16"
        >
          CHOOSE GAME MODE
        </motion.h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/online/quick">
              <div className="bg-black/50 rounded-2xl border-4 border-green-400 p-8 backdrop-blur-sm hover:border-green-300 transition-all cursor-pointer h-full">
                <div className="text-center space-y-4">
                  <h2 className="arcade-font text-2xl text-green-400">QUICK MATCH</h2>
                  <p className="text-gray-300">Find a random opponent instantly</p>
                  <div className="pt-4">
                    <span className="arcade-font px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg border-2 border-green-400 transition-all">
                      START
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/online/create">
              <div className="bg-black/50 rounded-2xl border-4 border-purple-400 p-8 backdrop-blur-sm hover:border-purple-300 transition-all cursor-pointer h-full">
                <div className="text-center space-y-4">
                  <h2 className="arcade-font text-2xl text-purple-400">CREATE ROOM</h2>
                  <p className="text-gray-300">Create a private room for friends</p>
                  <div className="pt-4">
                    <span className="arcade-font px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg border-2 border-purple-400 transition-all">
                      CREATE
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/online/join">
              <div className="bg-black/50 rounded-2xl border-4 border-blue-400 p-8 backdrop-blur-sm hover:border-blue-300 transition-all cursor-pointer h-full">
                <div className="text-center space-y-4">
                  <h2 className="arcade-font text-2xl text-blue-400">JOIN ROOM</h2>
                  <p className="text-gray-300">Enter a room code to join</p>
                  <div className="pt-4">
                    <span className="arcade-font px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg border-2 border-blue-400 transition-all">
                      JOIN
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
