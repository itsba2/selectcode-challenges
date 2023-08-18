import { useState } from "react";
import "./Board.css";
import Square from "./Square";

import MoveValidity from "../helpers/MoveValidity";
import { initialBoard } from "../helpers/initialBoard";
import { classNames } from "../helpers/classNames";
import { arrayInArray } from "../helpers/arrayInArray";

const Board = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const [selectedPiece, setSelectedPiece] = useState([]);
  const [validMoves, setValidMoves] = useState([]);
  const [piecesUnderThreat, setPiecesUnderThreat] = useState([]);
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (row, col) => {
    /**
     * Handles clicks on squares
     * @param {number} row Clicked row
     * @param {number} col Clicked col
     */

    // allow square select when there is no other piece selected
    if (!selectedPiece.length) {
      // does current player own the clicked piece?
      const currentPlayerOwnsPiece =
        board[row][col].piece?.color === currentPlayer;
      // if user owns that piece
      if (currentPlayerOwnsPiece) {
        // set selected piece
        setSelectedPiece([row, col]);

        // trigger valid moves handler
        const validMoves = handleValidMoves(row, col);

        // also trigger handler to show pieces under threat
        handlePiecesUnderThreat(validMoves);
      }
    } else {
      // if a piece is already selected
      // deselect it by click on the same piece
      if (selectedPiece[0] === row && selectedPiece[1] === col) {
        setSelectedPiece([]);

        // empty valid moves and pieces under threat
        setValidMoves([]);
        setPiecesUnderThreat([]);

        // if user clicks on a valid square, move that piece to the clicked square
      } else if (arrayInArray([row, col], validMoves)) {
        handleMove(selectedPiece[0], selectedPiece[1], row, col);
      }
    }
  };

  const handleValidMoves = (row, col) => {
    /**
     * Handles calculation of valid moves of selected piece
     * @param {number} row Clicked row
     * @param {number} col Clicked col
     */

    // Create a MoveValidity instance
    const moveValidity = new MoveValidity(board, currentPlayer);

    // get selected piece type
    const pieceType = board[row][col].piece?.type;

    // create an empty valids array to collect valid move positions
    let valids = [];

    // if a knight is selected
    if (pieceType === "knight") {
      // calculate valid moves for a knight at given position
      valids = moveValidity.validKnightMoves(row, col);
    } else if (pieceType === "queen") {
      // if a queen is selected
      // calculate valid moves for a queen at given position
      valids = moveValidity.validQueenMoves(row, col);
    }

    // set valid moves
    setValidMoves(valids);

    // return valid moves to use in pieces under threat handler
    return valids;
  };

  const handlePiecesUnderThreat = (validMoves) => {
    /**
     * Handles calculation of pieces under threat
     * @param {Array} validMoves Valid moves of a selected piece
     */

    // get opponent color
    const opponentColor = currentPlayer === "black" ? "white" : "black";

    // if an opponent piece is on valid move square
    // count it as a piece under threat
    const underThreats = validMoves.filter((validMove) => {
      if (board[validMove[0]][validMove[1]].piece?.color === opponentColor) {
        return [validMove[0], validMove[1]];
      }
    });

    // set pieces under threat
    setPiecesUnderThreat(underThreats);
  };

  const handleMove = (fromRow, fromCol, toRow, toCol) => {
    /**
     * Handles move of a piece after clicking on a valid move square
     * @param {number} fromRow Initial row number of moving piece
     * @param {number} fromCol Initial col number of moving piece
     * @param {number} toRow Final row number of moving piece
     * @param {number} toCol Final col number of moving piece
     */

    // first check if game continues
    // end game if a queen gets eaten
    if (board[toRow][toCol].piece?.type === "queen") {
      // set the winner
      setWinner(board[fromRow][fromCol].piece?.color);
    }

    // if game continues
    // create board copy
    const tempBoard = [...board];

    // assign selected piece to its new position
    tempBoard[toRow][toCol].piece = tempBoard[fromRow][fromCol].piece;

    // empty previous position
    tempBoard[fromRow][fromCol].piece = null;

    // set new board state
    setBoard(tempBoard);

    // empty selected piece, valid moves and pieces under threat
    setSelectedPiece([]);
    setValidMoves([]);
    setPiecesUnderThreat([]);

    // change turn
    setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
  };

  return (
    <>
      {winner ? (
        <h3>Winner: {winner.toUpperCase()}</h3>
      ) : (
        <h3>{currentPlayer.toUpperCase()}'s turn</h3>
      )}
      <div className={`board ${winner && "end-game"}`}>
        {board.map((row, rowIndex) =>
          row.map((square, squareIndex) => {
            return (
              <Square
                key={`row${rowIndex}sqr${squareIndex}`}
                piece={{ type: square.piece?.type, color: square.piece?.color }}
                style={{
                  squareClass: classNames(
                    // normal square
                    square && `${square?.color}-square`,
                    // selected square
                    selectedPiece[0] === rowIndex &&
                      selectedPiece[1] === squareIndex &&
                      "selected-square",
                    // under threat square
                    arrayInArray([rowIndex, squareIndex], piecesUnderThreat) &&
                      "under-threat-square"
                  ),
                  // set validMove property true to display valid move dots
                  validMove:
                    arrayInArray([rowIndex, squareIndex], validMoves) &&
                    !arrayInArray([rowIndex, squareIndex], piecesUnderThreat),
                }}
                onClick={() => {
                  // let user click on squares if game continues
                  if (!winner) handleSquareClick(rowIndex, squareIndex);
                }}
              />
            );
          })
        )}
      </div>
      {winner && <p>Refresh page to play again.</p>}
      <p>README.md file for credits.</p>
    </>
  );
};

export default Board;
