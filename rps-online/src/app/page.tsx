'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
            🎮 RPS ONLINE 🎮
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            The Ultimate Rock Paper Scissors Experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/50 rounded-2xl border-4 border-white/20 p-8 backdrop-blur-sm"
          >
            <h2 className="arcade-font text-2xl text-cyan-400 mb-4">🎯 Game Rules</h2>
            <ul className="space-y-3 text-gray-300">
              <li>🪨 <strong>Rock</strong> crushes Scissors</li>
              <li>📄 <strong>Paper</strong> covers Rock</li>
              <li>✂️ <strong>Scissors</strong> cuts Paper</li>
              <li>🤝 Same choice = <strong>Draw</strong></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/50 rounded-2xl border-4 border-white/20 p-8 backdrop-blur-sm"
          >
            <h2 className="arcade-font text-2xl text-pink-400 mb-4">🎮 Game Modes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-yellow-400 font-bold">🎯 Offline Mode</h3>
                <p className="text-gray-300 text-sm">Local multiplayer on same device</p>
              </div>
              <div>
                <h3 className="text-blue-400 font-bold">🌐 Online Mode</h3>
                <p className="text-gray-300 text-sm">Connect wallet & play with others</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-8"
        >
          <h2 className="arcade-font text-3xl text-white mb-8">Choose Your Mode</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/offline">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="arcade-font px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white rounded-lg border-2 border-gray-400 transition-all text-xl"
              >
                🎯 OFFLINE MODE
              </motion.button>
            </Link>
            <Link href="/online">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="arcade-font px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg border-2 border-blue-400 transition-all text-xl"
              >
                🌐 ONLINE MODE
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 text-gray-400"
        >
          <p>🔥 Arcade-Style Rock Paper Scissors • Ready for Web3 🔥</p>
        </motion.div>
      </div>
    </div>
  );
}