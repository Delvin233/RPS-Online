export type Choice = 'rock' | 'paper' | 'scissors';
export type GamePhase = 'commit' | 'reveal' | 'result';
export type GameResult = 'win' | 'lose' | 'draw';

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Match {
  id: string;
  player1: string;
  player2: string;
  player1Choice: Choice;
  player2Choice: Choice;
  winner: string | null;
  result: GameResult;
  timestamp: Date;
}

export interface GameState {
  phase: GamePhase;
  player1Choice: Choice | null;
  player2Choice: Choice | null;
  currentMatch: Match | null;
  players: Player[];
  matches: Match[];
}