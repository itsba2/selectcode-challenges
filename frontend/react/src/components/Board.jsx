import { useState } from "react";
import "./Board.css";
import Square from "./Square";
import { initialBoard } from "../helpers/initialBoard";
import MoveValidity from "../helpers/MoveValidity";
import { classNames } from "../helpers/classNames";
import { arrayInArray } from "../helpers/arrayInArray";

const Board = () => {
  // let board = initialBoard;
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const [selectedPiece, setSelectedPiece] = useState([]);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquareClick = (row, col) => {
    // allow square select when there is no other piece selected
    if (!selectedPiece.length) {
      // and when user owns that piece
      if (board[row][col].piece?.color === currentPlayer) {
        setSelectedPiece([row, col]);
        // trigger valid moves
        handleValidMoves(row, col, board[row][col].piece?.type);
      }
    } else {
      // if a piece is already selected
      // deselect it by click on the same piece
      if (selectedPiece[0] === row && selectedPiece[1] === col) {
        setSelectedPiece([]);
        setValidMoves([]);

        // if user clicks on a valid square, move that piece to the clicked square
      } else if (arrayInArray([row, col], validMoves)) {
        handleMove(selectedPiece[0], selectedPiece[1], row, col);
      }
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

  const handleMove = (fromRow, fromCol, toRow, toCol) => {
    // create board copy
    const tempBoard = [...board];
    // assign selected piece to its new position
    tempBoard[toRow][toCol].piece = tempBoard[fromRow][fromCol].piece;
    // empty previous position
    tempBoard[fromRow][fromCol].piece = null;
    // set new board state
    setBoard(tempBoard);
    // empty selected piece and valid moves
    setSelectedPiece([]);
    setValidMoves([]);
    setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
  };

  return (
    <>
      <h3>{currentPlayer.toUpperCase()}'s turn</h3>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((square, squareIndex) => {
            return (
              <Square
                key={`row${rowIndex}sqr${squareIndex}`}
                piece={{ type: square.piece?.type, color: square.piece?.color }}
                style={{
                  type: classNames(
                    // normal square
                    square && `${square?.color}-square`,
                    // selected square
                    selectedPiece[0] === rowIndex &&
                      selectedPiece[1] === squareIndex &&
                      "selected-square"
                  ),
                  validMove: arrayInArray([rowIndex, squareIndex], validMoves),
                }}
                onClick={() => handleSquareClick(rowIndex, squareIndex)}
              />
            );
          })
        )}
      </div>
      <p>README.md file for credits.</p>
    </>
  );
};

export default Board;
