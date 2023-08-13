import "./Board.css";
import Square from "./Square";
import { initialBoard } from "../../data/initialBoard";

const Board = () => {
  let board = initialBoard;

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((square, squareIndex) => (
          <Square
            key={`row${rowIndex}sqr${squareIndex}`}
            color={square?.color}
            piece={{ type: square?.piece?.type, color: square?.piece?.color }}
          />
        ))
      )}
    </div>
  );
};

export default Board;
