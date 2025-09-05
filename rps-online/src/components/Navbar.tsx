"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName } from "wagmi";

export default function Navbar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const displayName =
    ensName || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "");

  const navItems = [
    { href: "/online", label: "Play" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/matches", label: "Matches" },
  ];

  return (
    <nav className="bg-slate-900/90 backdrop-blur-sm border-b border-blue-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="arcade-font text-xl text-primary">
            RPS ONLINE
          </Link>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className={`px-3 py-2 rounded text-sm transition-colors ${
                    pathname === item.href || (pathname.startsWith('/online') && item.href === '/online')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800'
                  }`}>
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              {isConnected && displayName && (
                <span className="text-xs text-gray-400 hidden sm:block">
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
