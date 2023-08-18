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
  const [piecesUnderThreat, setPiecesUnderThreat] = useState([]);
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (row, col) => {
    const currentPlayerOwnsPiece =
      board[row][col].piece?.color === currentPlayer;
    // allow square select when there is no other piece selected
    if (!selectedPiece.length) {
      // and when user owns that piece
      if (currentPlayerOwnsPiece) {
        setSelectedPiece([row, col]);
        // trigger valid moves
        const validMoves = handleValidMoves(row, col);
        handlePiecesUnderThreat(validMoves);
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

  const handleValidMoves = (row, col) => {
    const pieceType = board[row][col].piece?.type;
    const moveValidity = new MoveValidity(board, currentPlayer);
    let valids = [];
    if (pieceType === "knight") {
      valids = moveValidity.validKnightMoves(row, col);
    } else if (pieceType === "queen") {
      valids = moveValidity.validQueenMoves(row, col);
    }
    setValidMoves(valids);
    return valids;
  };

  const handlePiecesUnderThreat = (validMoves) => {
    const opponentColor = currentPlayer === "black" ? "white" : "black";
    const underThreats = validMoves.filter((validMove) => {
      if (board[validMove[0]][validMove[1]].piece?.color === opponentColor) {
        return [validMove[0], validMove[1]];
      }
    });
    setPiecesUnderThreat(underThreats);
  };

  const handleMove = (fromRow, fromCol, toRow, toCol) => {
    // end game if a queen gets eaten
    if (board[toRow][toCol].piece?.type === "queen") {
      // set the winner
      setWinner(board[fromRow][fromCol].piece?.color);
    }
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
                  type: classNames(
                    // normal square
                    square && `${square?.color}-square`,
                    // selected square
                    selectedPiece[0] === rowIndex &&
                      selectedPiece[1] === squareIndex &&
                      "selected-square",
                    arrayInArray([rowIndex, squareIndex], piecesUnderThreat) &&
                      "under-threat-square"
                  ),
                  validMove:
                    arrayInArray([rowIndex, squareIndex], validMoves) &&
                    !arrayInArray([rowIndex, squareIndex], piecesUnderThreat),
                }}
                onClick={() => {
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
