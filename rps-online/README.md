# 🎮 RPS Online - Blockchain Beef Settler

An arcade-style Rock-Paper-Scissors game built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Arcade-Style UI**: Neon colors, glowing borders, and retro animations
- **Game Flow**: Commit → Reveal → Result phases
- **Leaderboard**: Track player scores with arcade-style rankings
- **Beef Log**: Scrollable history of all matches
- **Animations**: Flashy hand reveals and victory celebrations
- **Sound Ready**: Placeholder integration for Howler.js sound effects

## 🛠️ Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Howler.js** (ready for sound integration)

## 🎯 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Play

1. **Commit Phase**: Both players secretly choose Rock, Paper, or Scissors
2. **Reveal Phase**: Watch the flashy hand animations reveal the choices
3. **Result Phase**: See who wins with victory celebrations
4. **Repeat**: Start the next round and climb the leaderboard!

## 🔮 Web3 Integration Ready

This project is structured to easily add:
- Smart contracts for on-chain game logic
- NFT rewards for win streaks
- Cryptocurrency wagering
- Decentralized leaderboards

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── GameBoard.tsx      # Main game controller
│   ├── CommitPhase.tsx    # Secret choice selection
│   ├── RevealPhase.tsx    # Animated reveal
│   ├── ResultPhase.tsx    # Victory/defeat display
│   ├── Leaderboard.tsx    # Player rankings
│   └── BeefLog.tsx        # Match history
└── lib/
    ├── types.ts           # TypeScript definitions
    └── gameLogic.ts       # Game rules and utilities
```

## 🎨 Styling

The game features a full arcade aesthetic with:
- Neon gradient backgrounds
- Glowing borders and shadows
- Retro color schemes (cyan, purple, pink, yellow)
- Custom scrollbars
- Smooth animations and transitions

## 🔊 Sound Integration

Ready for Howler.js integration with placeholder sound effects for:
- Victory fanfare
- Defeat sounds
- Draw notifications
- Button clicks and interactions

---

Built for hackathons and ready for Web3! 🚀