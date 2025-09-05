'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useEnsName } from 'wagmi';
export default function Navbar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const displayName = ensName || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '');

  const navItems = [
    { href: '/online', label: 'Play' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/matches', label: 'Matches' }
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b-2 border-blue-500 shadow-lg shadow-blue-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="arcade-font text-xl text-primary hover:text-accent transition-colors">
            RPS ONLINE
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all
                      ${pathname.startsWith('/online') && item.href === '/online'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : pathname === item.href
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-blue-800/50'
                      }
                    `}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              {isConnected && displayName && (
                <span className="text-sm text-gray-300 arcade-font">
                  {displayName}
                </span>
              )}
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}