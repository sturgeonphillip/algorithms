import { solveStack } from './solveStack.js'
import { aSolved, aToSolve } from './puzzles.js'

// check solved puzzle candidate against a master key
export function verifySolution(candidate, master) {
  console.log('CANDIDATE:', candidate)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cs = candidate[i][j]
      const ms = master[i][j]
      if (cs !== ms) {
        console.log(`index: [${i}, ${j}]`, 'cs:', cs, 'ms:', ms)
        return false
      }
    }
  }

  return true
}

const aCandidate = solveStack(aToSolve)
console.log('aCandidtate:', verifySolution(aCandidate.puzzle, aSolved))
