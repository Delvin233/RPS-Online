// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RPSOnline {
    enum Move { None, Rock, Paper, Scissors }
    enum Phase { Commit, Reveal, Result }

    struct Match {
        address player1;
        address player2;
        bytes32 commit1;
        bytes32 commit2;
        Move move1;
        Move move2;
        Phase phase;
        address winner;
    }

    uint public nextMatchId;
    mapping(uint => Match) public matches;

    event MatchCreated(uint indexed matchId, address indexed creator, address indexed opponent);
    event MoveCommitted(uint indexed matchId, address indexed player);
    event MoveRevealed(uint indexed matchId, address indexed player, Move move);
    event MatchResult(uint indexed matchId, address winner);

    function createMatch(address opponent) external returns (uint matchId) {
        matchId = nextMatchId++;
        Match storage m = matches[matchId];
        m.player1 = msg.sender;
        m.player2 = opponent;
        m.phase = Phase.Commit;
        emit MatchCreated(matchId, msg.sender, opponent);
    }

    function commitMove(uint matchId, bytes32 commitment) external {
        Match storage m = matches[matchId];
        require(m.phase == Phase.Commit, "Not commit phase");
        require(msg.sender == m.player1 || msg.sender == m.player2, "Not a player");

        if (msg.sender == m.player1) {
            require(m.commit1 == 0, "Already committed");
            m.commit1 = commitment;
        } else {
            require(m.commit2 == 0, "Already committed");
            m.commit2 = commitment;
        }

        emit MoveCommitted(matchId, msg.sender);

        if (m.commit1 != 0 && m.commit2 != 0) {
            m.phase = Phase.Reveal;
        }
    }

    function revealMove(uint matchId, Move move, bytes32 salt) external {
        Match storage m = matches[matchId];
        require(m.phase == Phase.Reveal, "Not reveal phase");
        require(move == Move.Rock || move == Move.Paper || move == Move.Scissors, "Invalid move");

        bytes32 commitment = keccak256(abi.encodePacked(move, salt));

        if (msg.sender == m.player1) {
            require(m.move1 == Move.None, "Already revealed");
            require(commitment == m.commit1, "Invalid reveal");
            m.move1 = move;
        } else if (msg.sender == m.player2) {
            require(m.move2 == Move.None, "Already revealed");
            require(commitment == m.commit2, "Invalid reveal");
            m.move2 = move;
        } else {
            revert("Not a player");
        }

        emit MoveRevealed(matchId, msg.sender, move);

        if (m.move1 != Move.None && m.move2 != Move.None) {
            m.phase = Phase.Result;
            m.winner = determineWinner(m.move1, m.move2, m.player1, m.player2);
            emit MatchResult(matchId, m.winner);
        }
    }

    function determineWinner(Move m1, Move m2, address p1, address p2) internal pure returns (address) {
        if (m1 == m2) return address(0);
        if (
            (m1 == Move.Rock && m2 == Move.Scissors) ||
            (m1 == Move.Paper && m2 == Move.Rock) ||
            (m1 == Move.Scissors && m2 == Move.Paper)
        ) {
            return p1;
        } else {
            return p2;
        }
    }
}