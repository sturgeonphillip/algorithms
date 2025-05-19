import { check } from './check.js'
import {
  aToSolve,
  bToSolve,
  cToSolve,
  aSolved,
  bSolved,
  cSolved,
} from './puzzles.js'

// console.log(check(aToSolve))
// console.log(check(bToSolve))
// console.log(check(cToSolve))

export function solveSudokuStack(puzzle) {
  const stack = []
  function fillSquare(r, c, digit = 1) {
    if (digit > 9) {
      if (stack.length === 0) {
        return false
      }
      puzzle[r][c] = 0
      let prev = stack.pop()
      const [pr, pc] = prev
      // d = puzzle[pr][pc] + 1
      // return fillSquare(pr, pc, d)
      digit = puzzle[pr][pc]
      const result = fillSquare(pr, pc, digit + 1)

      return result
    }
    // puzzle[r][c] = d
    // const test = check(puzzle)
    // if (test === true) {
    //   return d
    // }
    puzzle[r][c] = digit
    if (check(puzzle)) return digit

    return fillSquare(r, c, digit + 1)
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (puzzle[r][c] === 0) {
        stack.push([r, c])
        // const square = fillSquare(r, c)
        // if (square) puzzle[r][c] = square
        const square = fillSquare(r, c)
        if (typeof square === 'string') return square
        if (square) puzzle[r][c] = square
      }
    }
  }
  return puzzle
}

console.log(solveSudokuStack(aToSolve))
// let d = 1
// if current === 0, push onto stack
// set puzzle[r][c] = d
// check if puzzle works with this modification

// if it doesn't, try it with puzzle[r][c] = d + 1
// if d === 9 && doesn't work, backtrack

// backtrack
// pop coordinates off stack, d = coords[r][c]
//

// console.log(check(aToSolve))
// console.log(check(bToSolve))
// console.log(check(cToSolve))

// console.log(solveSudokuStack(aToSolve))
// console.log(solveSudokuStack(bToSolve))
// console.log(solveSudokuStack(cToSolve))
