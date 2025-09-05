import { expect } from "chai";
import { ethers } from "hardhat";
import { RPSOnline } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("RPSOnline", function () {
  let rpsOnline: RPSOnline;
  let player1: SignerWithAddress;
  let player2: SignerWithAddress;

  beforeEach(async function () {
    [player1, player2] = await ethers.getSigners();
    const RPSOnline = await ethers.getContractFactory("RPSOnline");
    rpsOnline = await RPSOnline.deploy();
    await rpsOnline.waitForDeployment();
  });

  it("Should create a match", async function () {
    const tx = await rpsOnline.connect(player1).createMatch(player2.address);
    const receipt = await tx.wait();
    
    expect(receipt?.logs).to.have.lengthOf(1);
    
    const match = await rpsOnline.matches(0);
    expect(match.player1).to.equal(player1.address);
    expect(match.player2).to.equal(player2.address);
    expect(match.phase).to.equal(0); // Commit phase
  });

  it("Should allow players to commit and reveal moves", async function () {
    // Create match
    await rpsOnline.connect(player1).createMatch(player2.address);
    
    // Generate commitments
    const move1 = 1; // Rock
    const move2 = 2; // Paper
    const salt1 = ethers.id("salt1");
    const salt2 = ethers.id("salt2");
    
    const commitment1 = ethers.keccak256(ethers.solidityPacked(["uint8", "bytes32"], [move1, salt1]));
    const commitment2 = ethers.keccak256(ethers.solidityPacked(["uint8", "bytes32"], [move2, salt2]));
    
    // Commit moves
    await rpsOnline.connect(player1).commitMove(0, commitment1);
    await rpsOnline.connect(player2).commitMove(0, commitment2);
    
    // Check phase changed to Reveal
    let match = await rpsOnline.matches(0);
    expect(match.phase).to.equal(1); // Reveal phase
    
    // Reveal moves
    await rpsOnline.connect(player1).revealMove(0, move1, salt1);
    await rpsOnline.connect(player2).revealMove(0, move2, salt2);
    
    // Check final state
    match = await rpsOnline.matches(0);
    expect(match.phase).to.equal(2); // Result phase
    expect(match.move1).to.equal(move1);
    expect(match.move2).to.equal(move2);
    expect(match.winner).to.equal(player2.address); // Paper beats Rock
  });

  it("Should handle draw correctly", async function () {
    await rpsOnline.connect(player1).createMatch(player2.address);
    
    const move = 1; // Both play Rock
    const salt1 = ethers.id("salt1");
    const salt2 = ethers.id("salt2");
    
    const commitment1 = ethers.keccak256(ethers.solidityPacked(["uint8", "bytes32"], [move, salt1]));
    const commitment2 = ethers.keccak256(ethers.solidityPacked(["uint8", "bytes32"], [move, salt2]));
    
    await rpsOnline.connect(player1).commitMove(0, commitment1);
    await rpsOnline.connect(player2).commitMove(0, commitment2);
    
    await rpsOnline.connect(player1).revealMove(0, move, salt1);
    await rpsOnline.connect(player2).revealMove(0, move, salt2);
    
    const match = await rpsOnline.matches(0);
    expect(match.winner).to.equal(ethers.ZeroAddress); // Draw
  });
});