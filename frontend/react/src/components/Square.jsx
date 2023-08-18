import Piece from "./Piece";

const Square = ({ piece, style, onClick }) => {
  /**
   * Squares in the chess board.
   * @param {Object} piece The piece occupying the square
   * @param {string} piece.type Type of piece (knight or queen)
   * @param {string} piece.color Type of piece (knight or queen)
   * @param {Object} style How this square looks
   * @param {string} style.squareClass Square classes for styling
   * @param {Boolean} style.validMove For valid move dots
   * @param {Function} onClick What happens when this square is clicked
   */
  return (
    <div className={`square ${style.squareClass}`} onClick={onClick}>
      <div className={style.validMove ? "valid-move-square" : ""}></div>
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;
