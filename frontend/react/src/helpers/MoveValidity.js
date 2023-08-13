class MoveValidity {
  constructor(board) {
    this.board = board;
  }

  // calculate valid knight moves
  validKnightMoves(row, col) {
    const validMoves = [];

    const knightMoves = [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];

    knightMoves.forEach((move) => {
      // calculate new row,col pair for each possible move
      const newRow = row + move.row;
      const newCol = col + move.col;

      // check if the calculated row,col pair is valid
      if (this.isValidSquare(newRow, newCol, this.board)) {
        validMoves.push([newRow, newCol]);
      }
    });

    return validMoves;
  }

  validQueenMoves(row, col) {
    const validMoves = [];

    const queenMoves = [
      // diagonal
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 },
      // straight
      { row: 0, col: 1 },
      { row: 0, col: -1 },
      { row: 1, col: 0 },
      { row: -1, col: 0 },
    ];

    queenMoves.forEach((move) => {
      // calculate new row,col pair for each possible move
      let newRow = row + move.row;
      let newCol = col + move.col;

      // iterate over possible moves until queen cannot move anymore
      while (this.isValidSquare(newRow, newCol)) {
        validMoves.push([newRow, newCol]);
        if (this.board[newRow][newCol].piece) break;
        newRow += move.row;
        newCol += move.col;
      }
    });

    return validMoves;
  }

  isValidSquare(row, col) {
    // piece can move to square if
    return (
      row >= 0 &&
      row < this.board.length &&
      col >= 0 &&
      col < this.board[0].length &&
      // the square is empty
      !this.board[row][col].piece
    );
  }
}

export default MoveValidity;
