// Simple Vercel KV or use Vercel Postgres
// For now, using a simple global variable that resets on cold starts
// In production, replace with Vercel KV, Supabase, or PlanetScale

import { OnlineMatch } from './matchStore';

// Make it truly global across all modules
declare global {
  var globalMatches: Map<string, OnlineMatch> | undefined;
}

const globalMatches = globalThis.globalMatches ?? new Map<string, OnlineMatch>();
globalThis.globalMatches = globalMatches;

export const db = {
  async getMatch(matchId: string): Promise<OnlineMatch | null> {
    return globalMatches.get(matchId) || null;
  },

  async saveMatch(match: OnlineMatch): Promise<void> {
    globalMatches.set(match.matchId, match);
  },

  async getAllMatches(): Promise<OnlineMatch[]> {
    return Array.from(globalMatches.values());
  },

  async getCompletedMatches(): Promise<OnlineMatch[]> {
    return Array.from(globalMatches.values())
      .filter(match => match.status === 'completed')
      .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));
  }
};