'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/game', label: 'Play', icon: '🎮' },
    { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { href: '/matches', label: 'Matches', icon: '📜' }
  ];

  return (
    <nav className="bg-black/90 border-b-4 border-cyan-400 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/game" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            🎮 RPS ONLINE
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-4 py-2 rounded-lg font-bold transition-all
                    ${pathname === item.href
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-400/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/10 border-2 border-transparent'
                    }
                  `}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}