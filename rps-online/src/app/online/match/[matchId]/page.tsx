'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useParams } from 'next/navigation';
import OnlineGame from '@/components/OnlineGame';

export default function MatchPage() {
  const { isConnected } = useAccount();
  const params = useParams();
  const matchId = params.matchId as string;

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="arcade-font text-4xl text-primary">🎮 MATCH 🎮</h1>
          <p className="text-gray-300">Please connect your wallet to play</p>
          <ConnectButton />
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
            <OnlineGame initialMatchId={matchId} />
          </div>
        </div>
      </div>
    </div>
  );
}