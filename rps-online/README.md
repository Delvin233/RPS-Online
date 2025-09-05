# RPS-Online
A decentralized Rock-Paper-Scissors game built with Next.js and Solidity smart contracts.

## Smart Contract Development

### Setup
```bash
cd contracts
npm install
```

### Environment Setup
1. Copy `.env.example` to `.env`
2. Add your Base Sepolia RPC URL and private key:
```
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your_private_key_here
```

### Commands
```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Base Sepolia
npx hardhat run scripts/deploy.ts --network baseSepolia
```

### Contract Features
- **Commit-Reveal Scheme**: Prevents cheating by hiding moves until both players commit
- **On-chain Game Logic**: Fully decentralized gameplay
- **Event Logging**: Track match creation, moves, and results
- **Secure Randomness**: Uses cryptographic commitments

### Game Flow
1. Player 1 creates match with opponent address
2. Both players commit their moves (encrypted)
3. Both players reveal their moves with salt
4. Contract determines winner automatically

## Frontend Development
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to play the game.