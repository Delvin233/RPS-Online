import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, Move, generateCommitment, generateSalt } from './contract';

export class RPSContract {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor(signer: ethers.Signer) {
    this.signer = signer;
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }

  async createMatch(opponentAddress: string): Promise<number> {
    const tx = await this.contract.createMatch(opponentAddress);
    const receipt = await tx.wait();
    
    // Get matchId from event
    const event = receipt.logs.find((log: any) => 
      log.topics[0] === ethers.id('MatchCreated(uint256,address,address)')
    );
    
    if (event) {
      return parseInt(event.topics[1], 16);
    }
    throw new Error('Match creation failed');
  }

  async commitMove(matchId: number, move: Move): Promise<{ salt: string }> {
    const salt = generateSalt();
    const commitment = generateCommitment(move, salt);
    
    const tx = await this.contract.commitMove(matchId, commitment);
    await tx.wait();
    
    return { salt };
  }

  async revealMove(matchId: number, move: Move, salt: string): Promise<void> {
    const tx = await this.contract.revealMove(matchId, move, ethers.id(salt));
    await tx.wait();
  }

  async getMatch(matchId: number) {
    return await this.contract.matches(matchId);
  }

  onMatchCreated(callback: (matchId: number, creator: string, opponent: string) => void) {
    this.contract.on('MatchCreated', callback);
  }

  onMoveCommitted(callback: (matchId: number, player: string) => void) {
    this.contract.on('MoveCommitted', callback);
  }

  onMoveRevealed(callback: (matchId: number, player: string, move: number) => void) {
    this.contract.on('MoveRevealed', callback);
  }

  onMatchResult(callback: (matchId: number, winner: string) => void) {
    this.contract.on('MatchResult', callback);
  }
}