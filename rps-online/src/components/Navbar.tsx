'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useEnsName } from 'wagmi';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const [showDropdown, setShowDropdown] = useState(false);

  const displayName = ensName || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '');

  const navItems = [
    { 
      href: '/online', 
      label: 'Play', 
      icon: '🎮',
      submenu: [
        { href: '/online/quick', label: 'Quick Match', icon: '⚡' },
        { href: '/online/create', label: 'Create Room', icon: '🏠' },
        { href: '/online/join', label: 'Join Room', icon: '🚪' }
      ]
    },
    { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { href: '/matches', label: 'Matches', icon: '📜' }
  ];

  const showConnectButton = pathname.startsWith('/online');

  return (
    <nav className="bg-gray-900 border-b-2 border-blue-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="arcade-font text-xl text-primary hover:text-accent transition-colors">
            🎮 RPS ONLINE
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.submenu ? (
                    <div
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`
                          px-4 py-2 rounded-lg font-medium transition-all cursor-pointer
                          ${pathname.startsWith('/online')
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                          }
                        `}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </motion.div>
                      
                      {showDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg min-w-48 z-50"
                        >
                          {item.submenu.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href}>
                              <div className="px-4 py-3 hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg">
                                <span className="mr-2">{subItem.icon}</span>
                                {subItem.label}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href}>
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
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              {isConnected && displayName && (
                <span className="text-sm text-gray-300 arcade-font">
                  {displayName}
                </span>
              )}
              {showConnectButton && <ConnectButton />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}