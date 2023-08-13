import React from "react";
import Piece from "./Piece";

const Square = ({ piece, color, onClick}) => {
  return (
    <div className={`square ${color}`} onClick={onClick}>
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;