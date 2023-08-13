import React, { useState } from "react";
import Board from "../Board/Board";

const Game = () => {
  const [player, setPlayer] = useState("white");
  const [selectedPiece, setSelectedPiece] = useState([]);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquareClick = (row, col) => {
    console.log(row, col);
    if (selectedPiece.length) setSelectedPiece([]);
    else setSelectedPiece([row, col]);
  };

  return (
    <div className="game">
      <h1>Chess</h1>
      <Board
        player={player}
        selectedPiece={selectedPiece}
        validMoves={validMoves}
        onSquareClick={handleSquareClick}
      />
    </div>
  );
};

export default Game;
