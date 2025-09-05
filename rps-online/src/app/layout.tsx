import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { WalletProvider } from "@/providers/wallet";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RPS Online - Arcade Rock Paper Scissors",
  description: "Arcade-style Rock Paper Scissors game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <WalletProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            <Navbar />
            <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
              <div className="w-full max-w-4xl mx-auto px-4">
                {children}
              </div>
            </main>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
