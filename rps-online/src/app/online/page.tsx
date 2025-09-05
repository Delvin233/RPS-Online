'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function OnlinePage() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h1 className="arcade-font text-3xl text-primary">CONNECT WALLET</h1>
        <p className="text-gray-300">Connect to play online</p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <h1 className="arcade-font text-3xl text-primary text-center">
        GAME MODES
      </h1>
      
      <div className="grid md:grid-cols-3 gap-4 w-full max-w-2xl">
        <Link href="/online/quick">
          <div className="bg-slate-800/50 rounded-lg p-6 text-center hover:bg-slate-700/50 transition-colors">
            <h2 className="text-lg text-green-400 mb-2">Quick Match</h2>
            <p className="text-gray-400 text-sm">Random opponent</p>
          </div>
        </Link>

        <Link href="/online/create">
          <div className="bg-slate-800/50 rounded-lg p-6 text-center hover:bg-slate-700/50 transition-colors">
            <h2 className="text-lg text-purple-400 mb-2">Create Room</h2>
            <p className="text-gray-400 text-sm">Private match</p>
          </div>
        </Link>

        <Link href="/online/join">
          <div className="bg-slate-800/50 rounded-lg p-6 text-center hover:bg-slate-700/50 transition-colors">
            <h2 className="text-lg text-blue-400 mb-2">Join Room</h2>
            <p className="text-gray-400 text-sm">Enter room code</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
