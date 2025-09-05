import { OnlineMatch } from './matchStore';

// Use a more persistent global store
declare global {
  var __GLOBAL_MATCHES__: Map<string, OnlineMatch> | undefined;
}

if (!globalThis.__GLOBAL_MATCHES__) {
  globalThis.__GLOBAL_MATCHES__ = new Map<string, OnlineMatch>();
}

const matches = globalThis.__GLOBAL_MATCHES__;

export const db = {
  async getMatch(matchId: string): Promise<OnlineMatch | null> {
    console.log('Getting match:', matchId, 'Available matches:', Array.from(matches.keys()));
    const match = matches.get(matchId) || null;
    console.log('Found match:', match);
    return match;
  },

  async saveMatch(match: OnlineMatch): Promise<void> {
    console.log('Saving match:', match.matchId, match);
    matches.set(match.matchId, {
      ...match,
      createdAt: new Date(match.createdAt),
      completedAt: match.completedAt ? new Date(match.completedAt) : null
    });
    console.log('Total matches after save:', matches.size);
  },

  async getAllMatches(): Promise<OnlineMatch[]> {
    return Array.from(matches.values());
  },

  async getCompletedMatches(): Promise<OnlineMatch[]> {
    return Array.from(matches.values())
      .filter(match => match.status === 'completed')
      .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));
  },

  async deleteMatch(matchId: string): Promise<void> {
    matches.delete(matchId);
  }
};