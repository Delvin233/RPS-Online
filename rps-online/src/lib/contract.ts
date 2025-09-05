import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = '0x57E45A991De73D82A6D1A8d5a9Eaaa7F0d112A3E';
export const CONTRACT_ABI = [
  "function createMatch(address opponent) external returns (uint256 matchId)",
  "function commitMove(uint256 matchId, bytes32 commitment) external",
  "function revealMove(uint256 matchId, uint8 move, bytes32 salt) external",
  "function matches(uint256) external view returns (address player1, address player2, bytes32 commit1, bytes32 commit2, uint8 move1, uint8 move2, uint8 phase, address winner)",
  "function nextMatchId() external view returns (uint256)",
  "event MatchCreated(uint256 indexed matchId, address indexed creator, address indexed opponent)",
  "event MoveCommitted(uint256 indexed matchId, address indexed player)",
  "event MoveRevealed(uint256 indexed matchId, address indexed player, uint8 move)",
  "event MatchResult(uint256 indexed matchId, address winner)"
];

export enum Move {
  None = 0,
  Rock = 1,
  Paper = 2,
  Scissors = 3
}

export enum Phase {
  Commit = 0,
  Reveal = 1,
  Result = 2
}

export function generateCommitment(move: Move, salt: string): string {
  return ethers.keccak256(ethers.solidityPacked(['uint8', 'bytes32'], [move, ethers.id(salt)]));
}

export function generateSalt(): string {
  return ethers.hexlify(ethers.randomBytes(32));
}