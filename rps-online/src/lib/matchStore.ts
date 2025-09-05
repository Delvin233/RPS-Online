import { Choice } from './types';
import { db } from './db';

export interface OnlineMatch {
  matchId: string;
  player1Id: string | null;
  player2Id: string | null;
  player1Choice: Choice | null;
  player2Choice: Choice | null;
  player1Revealed: boolean;
  player2Revealed: boolean;
  result: 'win' | 'lose' | 'draw' | null;
  winner: string | null;
  status: 'waiting' | 'ready' | 'committed' | 'revealed' | 'completed';
  createdAt: Date;
  completedAt: Date | null;
}

class MatchStore {

  generateMatchId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async createMatch(playerId: string): Promise<OnlineMatch> {
    const matchId = this.generateMatchId();
    const match: OnlineMatch = {
      matchId,
      player1Id: playerId,
      player2Id: null,
      player1Choice: null,
      player2Choice: null,
      player1Revealed: false,
      player2Revealed: false,
      result: null,
      winner: null,
      status: 'waiting',
      createdAt: new Date(),
      completedAt: null
    };
    await db.saveMatch(match);
    return match;
  }

  async joinMatch(matchId: string, playerId: string): Promise<OnlineMatch | null> {
    const match = await db.getMatch(matchId);
    if (!match || match.player2Id || match.player1Id === playerId) return null;
    
    match.player2Id = playerId;
    match.status = 'ready';
    await db.saveMatch(match);
    return match;
  }

  async getMatch(matchId: string): Promise<OnlineMatch | null> {
    return await db.getMatch(matchId);
  }

  async commitMove(matchId: string, playerId: string, choice: Choice): Promise<OnlineMatch | null> {
    console.log('commitMove called with:', { matchId, playerId, choice });
    const match = await db.getMatch(matchId);
    console.log('Found match:', match);
    
    if (!match) {
      console.log('No match found');
      return null;
    }
    
    if (match.status === 'completed') {
      console.log('Match already completed');
      return null;
    }

    console.log('Player IDs - match.player1Id:', match.player1Id, 'match.player2Id:', match.player2Id, 'current playerId:', playerId);

    if (match.player1Id === playerId) {
      console.log('Setting player1Choice');
      match.player1Choice = choice;
    } else if (match.player2Id === playerId) {
      console.log('Setting player2Choice');
      match.player2Choice = choice;
    } else {
      console.log('Player not found in match');
      return null;
    }

    if (match.player1Choice && match.player2Choice) {
      match.status = 'committed';
    }

    await db.saveMatch(match);
    console.log('Match saved:', match);
    return match;
  }

  async revealMove(matchId: string, playerId: string): Promise<OnlineMatch | null> {
    const match = await db.getMatch(matchId);
    if (!match || match.status !== 'committed') return null;

    if (match.player1Id === playerId) {
      match.player1Revealed = true;
    } else if (match.player2Id === playerId) {
      match.player2Revealed = true;
    } else {
      return null;
    }

    if (match.player1Revealed && match.player2Revealed) {
      this.calculateResult(match);
    }

    await db.saveMatch(match);
    return match;
  }

  private calculateResult(match: OnlineMatch): void {
    if (!match.player1Choice || !match.player2Choice) return;

    const p1 = match.player1Choice;
    const p2 = match.player2Choice;

    if (p1 === p2) {
      match.result = 'draw';
      match.winner = null;
    } else if (
      (p1 === 'rock' && p2 === 'scissors') ||
      (p1 === 'paper' && p2 === 'rock') ||
      (p1 === 'scissors' && p2 === 'paper')
    ) {
      match.result = 'win';
      match.winner = match.player1Id;
    } else {
      match.result = 'lose';
      match.winner = match.player2Id;
    }

    match.status = 'completed';
    match.completedAt = new Date();
  }

  async getCompletedMatches(): Promise<OnlineMatch[]> {
    return await db.getCompletedMatches();
  }

  async deleteMatch(matchId: string): Promise<void> {
    await db.deleteMatch(matchId);
  }

  async cleanupExpiredMatches(): Promise<void> {
    const matches = await db.getAllMatches();
    const now = new Date();
    const twentyMinutes = 20 * 60 * 1000;
    
    for (const match of matches) {
      const matchAge = now.getTime() - match.createdAt.getTime();
      if (matchAge > twentyMinutes && match.status !== 'completed') {
        await db.deleteMatch(match.matchId);
      }
    }
  }
}

export const matchStore = new MatchStore();