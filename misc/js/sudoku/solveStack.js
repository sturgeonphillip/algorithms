import { isValidInput } from './isValidInput.js'

import { aToSolve } from './puzzles.js'

// solve using stack
// logs moves while traversing and backtracking
export function solveStack(puzzle) {
  // @ts-ignore
  const DEBUG = process.env.NODE_ENV !== 'production'

  if (!isValidInput(puzzle)) {
    throw new Error('Invalid puzzle input.')
  }

  const stack = []

  // locally store membership in affected structure
  // avoids scanning the full grid repeatedly
  const rowSets = Array.from({ length: 9 }, () => new Set())
  const colSets = Array.from({ length: 9 }, () => new Set())
  const boxSets = Array.from({ length: 9 }, () => new Set())

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = puzzle[r][c]
      if (val === 0) {
        stack.push([r, c])
      } else {
        const box = Math.floor(r / 3) * 3 + Math.floor(c / 3)
        rowSets[r].add(val)
        colSets[c].add(val)
        boxSets[box].add(val)
      }
    }
  }

  const fillFromStack = (idx) => {
    // all squares filled
    if (idx === stack.length) return true

    const [r, c] = stack[idx]
    const box = Math.floor(r / 3) * 3 + Math.floor(c / 3)

    for (let d = 1; d <= 9; d++) {
      if (!rowSets[r].has(d) && !colSets[c].has(d) && !boxSets[box].has(d)) {
        puzzle[r][c] = d
        rowSets[r].add(d)
        colSets[c].add(d)
        boxSets[box].add(d)

        if (DEBUG) console.log(`-> Trying ${d} at [${r}, ${c}]`)

        if (fillFromStack(idx + 1)) return true

        // backtrack
        puzzle[r][c] = 0
        rowSets[r].delete(d)
        colSets[c].delete(d)
        boxSets[box].delete(d)

        if (DEBUG)
          console.log(
            `<- Backtrack from [${r}, ${c}] (tried ${d})`,
            'color: red'
          )
      }
    }
    return false
  }
  const complete = fillFromStack(0)
  return complete
    ? { result: true, puzzle }
    : { result: false, puzzle: 'This puzzle has no solution.' }
}

console.log(solveStack(aToSolve))
