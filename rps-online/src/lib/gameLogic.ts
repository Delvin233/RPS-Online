import { Choice, GameResult } from './types';

export const determineWinner = (player1Choice: Choice, player2Choice: Choice): GameResult => {
  if (player1Choice === player2Choice) return 'draw';
  
  const winConditions: Record<Choice, Choice> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };
  
  return winConditions[player1Choice] === player2Choice ? 'win' : 'lose';
};

export const getChoiceEmoji = (choice: Choice): string => {
  const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
  };
  return emojis[choice];
};

export const generateMatchId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};