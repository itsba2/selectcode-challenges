import { useState } from "react";
import "./Board.css";
import Square from "./Square";
import { initialBoard } from "../helpers/initialBoard";
import MoveValidity from "../helpers/MoveValidity";
import { classNames } from "../helpers/classNames";
import { arrayInArray } from "../helpers/arrayInArray";

const Board = () => {
  let board = initialBoard;
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const [selectedPiece, setSelectedPiece] = useState([]);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquareClick = (row, col) => {
    // allow select only when user owns piece and there is no piece selected
    if (board[row][col].piece?.color === currentPlayer) {
      if (!selectedPiece.length) {
        setSelectedPiece([row, col]);
        // trigger valid moves
        handleValidMoves(row, col, board[row][col].piece?.type);
      }
    }
    // if a piece is already selected, deselect it by click on the same piecef
    if (
      selectedPiece.length &&
      selectedPiece[0] === row &&
      selectedPiece[1] === col
    ) {
      setSelectedPiece([]);
      setValidMoves([]);
    }
  };

  const handleValidMoves = (row, col, piece) => {
    const moveValidity = new MoveValidity(board);
    let valids = [];
    if (piece === "knight") {
      valids = moveValidity.validKnightMoves(row, col);
    } else if (piece === "queen") {
      valids = moveValidity.validQueenMoves(row, col);
    }
    setValidMoves(valids);
  };

  return (
    <>
      <h1>Chess</h1>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((square, squareIndex) => {
            return (
              <Square
                key={`row${rowIndex}sqr${squareIndex}`}
                piece={{ type: square.piece?.type, color: square.piece?.color }}
                color={classNames(
                  // normal square
                  square && `${square?.color}-square`,
                  // selected square
                  selectedPiece[0] === rowIndex &&
                    selectedPiece[1] === squareIndex &&
                    "selected-square",
                  // valid move square
                  arrayInArray([rowIndex, squareIndex], validMoves) &&
                    "valid-move-square"
                )}
                onClick={() => handleSquareClick(rowIndex, squareIndex)}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Board;
