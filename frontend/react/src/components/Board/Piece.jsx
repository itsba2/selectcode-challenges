import blackKnight from "../../assets/pieces/black/knight.svg";
import blackQueen from "../../assets/pieces/black/queen.svg";
import whiteKnight from "../../assets/pieces/white/knight.svg";
import whiteQueen from "../../assets/pieces/white/queen.svg";

const Piece = ({ type, color }) => {
  if (!type || !color) return null
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
