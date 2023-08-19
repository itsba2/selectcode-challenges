// Import vector graphics of pieces
/**
 * CREDITS
 * - [White queen](https://en.wikipedia.org/wiki/File:Chess_qlt45.svg)
 * - [Black queen](https://en.wikipedia.org/wiki/File:Chess_qdt45.svg)
 * - [White knight](https://en.wikipedia.org/wiki/File:Chess_nlt45.svg)
 * - [Black knight](https://en.wikipedia.org/wiki/File:Chess_ndt45.svg)
 */

import blackKnight from "../assets/pieces/black/knight.svg";
import blackQueen from "../assets/pieces/black/queen.svg";
import whiteKnight from "../assets/pieces/white/knight.svg";
import whiteQueen from "../assets/pieces/white/queen.svg";

const Piece = ({ type, color }) => {
  /**
   * Pieces in squares
   * @param {string} type Type of a piece (queen or knight)
   * @param {string} color Color of a piece (black or white)
   * @returns {HTMLImageElement} Corresponding vector graphic
   */

  // if not type or color, no piece image
  if (!type || !color) return null;

  if (color == "black") {
    if (type == "knight") {
      return <img src={blackKnight} />;
    } else {
      return <img src={blackQueen} />;
    }
  } else {
    if (type == "knight") {
      return <img src={whiteKnight} />;
    } else {
      return <img src={whiteQueen} />;
    }
  }
};

export default Piece;
