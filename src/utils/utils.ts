export interface SquareState {
  state: null | boolean;
  col: number;
}

export interface BoardRow {
  rowNumber: number;
  row: SquareState[];
}

export function checkVictory(
  board: BoardRow[],
  row: number,
  col: number,
  turn: boolean
): [boolean, number] {
  if (
    board[(row - 1 + 3) % 3].row[col].state == turn &&
    board[(row + 1) % 3].row[col].state == turn
  ) {
    //console.log("victory1");
    return [true, col + 3];
  } else if (
    board[row].row[(col - 1 + 3) % 3].state == turn &&
    board[row].row[(col + 1) % 3].state == turn
  ) {
    //console.log("victory2");
    return [true, row];
  } else if (
    row == col &&
    board[(row + 1) % 3].row[(col + 1) % 3].state == turn &&
    board[(row - 1 + 3) % 3].row[(col - 1 + 3) % 3].state == turn
  ) {
    //console.log("victory3");
    return [true, 6];
  } else if (
    ((row == 1 && col == 1) || Math.abs(row - col) == 2) &&
    board[(row + 1) % 3].row[(col - 1 + 3) % 3].state == turn &&
    board[(row - 1 + 3) % 3].row[(col + 1) % 3].state == turn
  ) {
    //console.log("victory4");
    return [true, 7];
  } else {
    return [false, -1];
  }
}
