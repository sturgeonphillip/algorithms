function finish(matrix) {
  const stack = []

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrix[i][j] === 0) {
        stack.push([i, j])
      }
    }
  }

  // fill squares from first empty square
  return matrix.every((x) => x.includes(0))
    ? fillSquare(matrix, stack)
    : checkPuzzle(matrix)
}

function fillSquare(matrix, stack) {
  if (stack.length === 0) {
    // solved
    return matrix
  }

  // get next empty square
  const [i, j] = stack.pop()

  for (let d = 1; d <= 9; d++) {
    // try filling the square with d
    matrix[i][j] = d

    if (checkPuzzle(matrix)) {
      const result = fillSquare(matrix, stack)

      // if puzzle is solved return the matrix
      if (result) {
        return result
      }
    }

    // reset the square if not valid
    matrix[i][j] = 0
  }

  // push square back onto the stack if no valid number
  stack.push([i, j])

  // no solution found
  return false
}

function checkPuzzle(matrix) {
  const rowSets = Array.from({ length: 9 }, () => new Set())
  const colSets = Array.from({ length: 9 }, () => new Set())
  const boxSets = Array.from({ length: 9 }, () => new Set())

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = matrix[r][c]

      if (val === 0) continue

      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3)

      if (
        rowSets[r].has(val) ||
        colSets[c].has(val) ||
        boxSets[boxIdx].has(val)
      ) {
        // found a duplicate
        return false
      }

      rowSets[r].add(val)
      colSets[c].add(val)
      boxSets[boxIdx].add(val)
    }
  }
  // no duplicates
  return true
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
]

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
]

console.log(finish(wrong))
console.log(finish(toSolve))

/**
 * Issues:
 * fillSquare function is assigning incorrect values to squares that start as 0. The logic is flawed.
 * It doesn't properly check if the number is valid according to actual sudoku rules. return from checkPuzzzle is ineffective for backtracking.
 * When a number is invalid, the function should backtrack to the previous square and try the next number, but it currently does not handle it correctly. This leads to the same number being placed repeatedly.
 * The function sets the value of the square to d without checking if it's valid. If checkPuzzle returns false, the function should not proceed to the next number without resetting the square back to 0.
 *
 *
 *
 *
 */
