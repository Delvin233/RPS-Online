'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';


export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/game', label: 'Local', icon: '🎮' },
    { href: '/online', label: 'Online', icon: '🌍' },
    { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { href: '/matches', label: 'Matches', icon: '📜' }
  ];

  return (
    <nav className="bg-gray-900 border-b-2 border-blue-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/game" className="arcade-font text-xl text-primary hover:text-accent transition-colors">
            🎮 RPS ONLINE
          </Link>
          
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all
                    ${pathname === item.href
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
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