import { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";

function Square({ value, handler }) {
  return (
    <button className="square" onClick={handler}>
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  handler: PropTypes.func.isRequired,
};

function Board({ squares, nextPlayer, onMove }) {
  function handleClick(i) {
    if (!squares[i]) {
      const squaresClone = squares.slice();
      squaresClone[i] = nextPlayer;
      onMove(squaresClone);
    }
  }

  const squareElements = Array.from(
    { length: Math.sqrt(squares.length) },
    (_, index) => index * 3 + 2
  ).map((val) => (
    <div key={val - 2} className="board-row">
      <Square
        key={val - 2}
        value={squares[val - 2]}
        handler={() => handleClick(val - 2)}
      />
      <Square
        key={val - 1}
        value={squares[val - 1]}
        handler={() => handleClick(val - 1)}
      />
      <Square key={val} value={squares[val]} handler={() => handleClick(val)} />
    </div>
  ));

  return <>{squareElements}</>;
}

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  nextPlayer: PropTypes.string.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveIndex, setMoveIndex] = useState(0);
  const squares = history[moveIndex];
  const nextPlayer = moveIndex % 2 == 0 ? "X" : "O";
  let winner = null;

  function recordHistory(nextSquares) {
    if (!winner) {
      const nextHistory = [...history.slice(0, moveIndex + 1), nextSquares];
      setHistory(nextHistory);
      setMoveIndex(nextHistory.length - 1);
    }
  }

  function jumpTo(move) {
    setMoveIndex(move);
  }

  const moves = history.map((ignored, move) => {
    const description = move == 0 ? "Go to start" : "Go to move # " + move;

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const status = () => {
    checkWinner(history[moveIndex]);
    return winner ? (
      <span className="status">Winner is: {winner}</span>
    ) : (
      <span className="status">Next Player: {nextPlayer}</span>
    );
  };

  const allEqual = (arr, inverseArr, checkValue) =>
    arr.every((val) => val === checkValue) ||
    inverseArr.every((val) => val === checkValue);

  function checkWinner() {
    const recent = [...history[moveIndex]];
    const matrix = [];
    while (recent.length > 0) {
      matrix.push(recent.splice(0, 3));
    }

    const leftDiagonal = [];
    const rightDiagonal = [];
    let diagIndex = 0;
    for (let x = 0; x < 3; x++) {
      leftDiagonal[diagIndex] = matrix[x][x];
      rightDiagonal[diagIndex] = matrix[x][2 - x * 1];
      diagIndex++;
    }
    if (allEqual(leftDiagonal, rightDiagonal, "X")) {
      winner = "X";
    }
    if (allEqual(leftDiagonal, rightDiagonal, "O")) {
      winner = "O";
    }

    for (let i = 0; i < 3; i++) {
      const checker = [];
      const inverseChecker = [];
      let checkIndex = 0;
      for (let j = 0; j < 3; j++) {
        checker[checkIndex] = matrix[i][j];
        inverseChecker[checkIndex] = matrix[j][i];
        checkIndex++;
      }
      if (allEqual(checker, inverseChecker, "X")) {
        winner = "X";
      }
      if (allEqual(checker, inverseChecker, "O")) {
        winner = "O";
      }
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          nextPlayer={nextPlayer}
          onMove={recordHistory}
        />
      </div>
      <div className="game-info">
        <span className="status">{status()}</span>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
