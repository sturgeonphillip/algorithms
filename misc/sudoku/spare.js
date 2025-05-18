function finish(matrix, stack = []) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let square = matrix[i][j];
      if (square === 0) {
        stack.push([i, j]);

        // fill square with number
        const fill = fillSquare(matrix, stack, i, j);
        if (fill && fill[2] === false) return false;
      }
    }
  }

  return matrix;
}

function fillSquare(mtrx, stck, i, j, d = 1) {
  // if we've tried all numbers for d then backtrack
  if (d > 9) {
    if (stck.length === 0) {
      return [mtrx, stck, false];
    }

    const [prevI, prevJ] = stck.pop();

    return fillSquare(mtrx, stck, prevI, prevJ);
  }

  // try filling the square with d
  mtrx[i][j] = d;
  const candidate = checkPuzzle(mtrx);

  if (candidate === true) {
    // if valid, move to the next square
    return fillSquare(mtrx, stck, i, j + 1);
  } else {
    // if not valid, try the next number
    return fillSquare(mtrx, stck, i, j, d + 1);
  }
}

function checkPuzzle(matrix) {
  const rowSets = Array.from({ length: 9 }, () => new Set());
  const colSets = Array.from({ length: 9 }, () => new Set());
  const boxSets = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = matrix[r][c];

      if (val === 0) continue;

      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      rowSets[r].add(val);
      colSets[c].add(val);
      boxSets[boxIdx].add(val);

      if (rowSets[r].has(val)) return false; // [ false, 'duplicate in row:', r, val]
      if (colSets[c].has(val)) return false; // [ false, 'duplicate in column:', c, val]
      if (boxSets[boxIdx].has(val)) return false; // [ false, 'duplicate in box:', boxIdx, 'value:', val]
    }
  }
  return true;
}

export const wrong = [
  [8, 7, 1, 3, 6, 9, 5, 4, 2],
  [2, 8, 4, 5, 1, 4, 8, 9, 7],
  [5, 4, 9, 2, 8, 7, 1, 6, 3],
  [9, 8, 3, 4, 2, 5, 7, 1, 6],
  [1, 2, 5, 7, 9, 6, 3, 8, 4],
  [7, 6, 9, 8, 3, 1, 2, 5, 9],
  [4, 1, 7, 9, 5, 2, 6, 3, 8],
  [3, 5, 2, 6, 4, 8, 9, 7, 1],
  [6, 9, 8, 1, 7, 3, 4, 2, 5],
];

export const toSolve = [
  [0, 7, 0, 3, 6, 9, 5, 0, 0],
  [2, 0, 6, 5, 0, 0, 0, 0, 7],
  [0, 0, 0, 2, 0, 0, 1, 6, 3],
  [0, 8, 0, 0, 2, 5, 0, 1, 0],
  [0, 2, 5, 7, 9, 0, 0, 0, 0],
  [7, 6, 4, 0, 0, 0, 2, 5, 0],
  [4, 1, 7, 0, 5, 0, 0, 0, 8],
  [0, 5, 0, 6, 0, 8, 9, 0, 0],
  [0, 0, 8, 0, 0, 3, 4, 0, 0],
];

// console.log(checkPuzzle(wrong));
console.log(finish(toSolve));

/**
 * Issues:
 * fillSquare function is assigning incorrect values to squares that start as 0. The logic is flawed.
 * It doesn't properly check if the number is valid according to actual sudoku rules. return from checkPuzzzle is ineffective for backtracking.
 * When a number is invalid, the function should backtrack to the previous square and try the next number, but it currently does not handle it correctly. This leads to the same number being placed repeatedly.
 * The function sets the value of the square to d without checking if it's valid. If checkPuzzle returns false, the function should not proceed to the next number without resetting the square back to 0.
 *
 *
 *
 */
