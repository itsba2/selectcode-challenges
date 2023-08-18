import React from "react";
import Piece from "./Piece";
import { classNames } from "../helpers/classNames";

const Square = ({ piece, style, onClick }) => {
  /**
   * Squares in the chess board.
   * @param {object} piece The piece occupying the square
   * @param {object} style How this square looks
   * @param {function} onClick What happens when this square is clicked
   */
  return (
    <div className={`square ${style.type}`} onClick={onClick}>
      <div
        className={classNames(
          style.validMove && "valid-move-square",
        )}
      ></div>
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;
