'use client';

import OnlineGame from '@/components/OnlineGame';

export default function OnlinePage() {
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