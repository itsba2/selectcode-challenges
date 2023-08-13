import "./Board.css";
import Square from "./Square";
import { initialBoard } from "./initialBoard";

const Board = ({ player, selectedPiece, validMoves, onSquareClick }) => {
  let board = initialBoard;

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((square, squareIndex) => (
          <Square
            key={`row${rowIndex}sqr${squareIndex}`}
            piece={{ type: square?.piece?.type, color: square?.piece?.color }}
            color={
              selectedPiece[0] === rowIndex && selectedPiece[1] === squareIndex
                ? "selected"
                : square?.color
            }
            onClick={() => onSquareClick(rowIndex, squareIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;
