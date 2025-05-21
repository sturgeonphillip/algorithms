import { check } from './check.js'
import {
  aToSolve,
  bToSolve,
  cToSolve,
  aSolved,
  bSolved,
  cSolved,
} from './puzzles.js'

// solve using stack
// logs moves while traversing and backtracking
export function solveSudokuStack(puzzle) {
  const stack = []

  // collect all empty cells
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (puzzle[r][c] === 0) {
        stack.push([r, c])
      }
    }
  }

  const fillFromStack = (idx) => {
    // all squares filled
    if (idx === stack.length) return true

    const [r, c] = stack[idx]

    for (let d = 1; d <= 9; d++) {
      puzzle[r][c] = d
      console.log(`Trying ${d} at [${r}, ${c}]`)
      const isValid = check(puzzle)

      if (isValid === true) {
        if (fillFromStack(idx + 1)) {
          // continues to next square
          return true
        }
      }

      // undo if not valid or dead-end later
      console.log(`Backtrack from [${r}, ${c}] (tried ${d})`)
      puzzle[r][c] = 0
    }

    // none of the digits worked
    return false
  }

  const complete = fillFromStack(0)
  return complete
    ? { result: true, puzzle }
    : { result: false, puzzle: 'This puzzle has no solution.' }
}

console.log(solveSudokuStack(aToSolve))
