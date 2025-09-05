"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="arcade-font text-4xl text-primary">
          RPS ONLINE
        </h1>
        <p className="text-xl text-gray-300">
          Rock Paper Scissors on the blockchain
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 rounded-lg p-6 max-w-md w-full"
      >
        <h2 className="text-lg text-blue-400 mb-4 text-center">Game Rules</h2>
        <div className="space-y-2 text-gray-300 text-sm">
          <div><strong>Rock</strong> crushes Scissors</div>
          <div><strong>Paper</strong> covers Rock</div>
          <div><strong>Scissors</strong> cuts Paper</div>
          <div>Same choice = <strong>Draw</strong></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/online">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="arcade-font px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg border-2 border-blue-400 text-lg shadow-lg shadow-blue-500/25"
          >
            START PLAYING
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
