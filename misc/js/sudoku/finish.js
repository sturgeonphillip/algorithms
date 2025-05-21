import { check } from './check.js'
import { wrong, aToSolve } from './puzzles.js'

// return false if wrong, complete puzzle if true
export function finish(matrix) {
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
    : check(matrix)
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

    if (check(matrix)) {
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

console.log(finish(wrong))
console.log(finish(aToSolve))

/**
 * Issues:
 * fillSquare function is assigning incorrect values to squares that start as 0. The logic is flawed.
 * It doesn't properly check if the number is valid according to actual sudoku rules. return from checkPuzzzle is ineffective for backtracking.
 * When a number is invalid, the function should backtrack to the previous square and try the next number, but it currently does not handle it correctly. This leads to the same number being placed repeatedly.
 * The function sets the value of the square to d without checking if it's valid. If check returns false, the function should not proceed to the next number without resetting the square back to 0.
 *
 *
 *
 *
 */
