import { solveSudokuStack } from './mainStack.js'
import { aToSolve } from './puzzles.js'

// check solved puzzle candidate against a master key
export function verifySolution(candidate, master) {
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

const aCandidate = solveSudokuStack(aToSolve)
console.log('aCandidtate:', aCandidate)
