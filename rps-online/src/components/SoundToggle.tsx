'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '@/lib/soundManager';

export default function SoundToggle() {
  const [muted, setMuted] = useState(false);

  const toggleSound = () => {
    const newMuted = soundManager.toggleMute();
    setMuted(newMuted);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleSound}
      className={`
        p-2 rounded-lg border-2 transition-all
        ${muted 
          ? 'border-red-400 text-red-400 bg-red-900/20' 
          : 'border-lime-400 text-lime-400 bg-lime-900/20'
        }
      `}
    >
      {muted ? '🔇' : '🔊'}
    </motion.button>
  );
}