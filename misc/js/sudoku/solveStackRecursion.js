import { check } from './check.js'
import { wrong, aToSolve } from './puzzles.js'

// uses DFS-style recursion with a stack-fed path of empty squares
export function solveStackRecursion(matrix) {
  // return false if wrong, complete puzzle if true
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

  // // push square back onto the stack if no valid number
  // stack.push([i, j])

  // no solution found
  return false
}

console.log(solveStackRecursion(wrong))
console.log(solveStackRecursion(aToSolve))
