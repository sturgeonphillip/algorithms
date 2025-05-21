import { aSolved, aToSolve, wrong } from './puzzles.js'

// explicitly validates a completed sudoku puzzle
// return is an object w/ at least { valid: true }
// if false, object includes an array of descriptive errors
export function validateCompleteSudoku(puzzle) {
  const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const complete = { valid: true }

  // check rows
  for (let r = 0; r < 9; r++) {
    const rowSet = new Set(puzzle[r])
    // check if row has exactly 9 unique values from 1 - 9
    if (rowSet.size !== 9 || !NUMBERS.every((num) => rowSet.has(num))) {
      const missing = NUMBERS.filter((x) => !rowSet.has(x))
      if (!complete.hasOwnProperty('rowErrors')) {
        complete.rowErrors = []
      }
      complete.rowErrors.push({
        reason: `Row ${r} is invalid.`,
        location: 'row',
        index: r,
        missing: missing.toString(),
      })
    }
    if (complete.rowErrors && complete.rowErrors.length > 0) {
      complete.valid = false
    }
  }

  for (let c = 0; c < 9; c++) {
    const colValues = []
    for (let k = 0; k < 9; k++) {
      colValues.push(puzzle[k][c])
    }

    const colSet = new Set(colValues)

    if (colSet.size !== 9 || !NUMBERS.every((num) => colSet.has(num))) {
      const missing = NUMBERS.filter((x) => !colSet.has(x))

      if (!complete.hasOwnProperty('colErrors')) {
        complete.colErrors = []
      }
      complete.colErrors.push({
        reason: `Column ${c} is invalid`,
        location: 'column',
        index: c,
        missing: missing.toString(),
      })
    }
  }
  if (complete.colErrors && complete.colErrors.length > 0) {
    complete.valid = false
  }

  // check boxes
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const boxValues = []
      const boxIndex = br * 3 + bc

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          boxValues.push(puzzle[br * 3 + r][bc * 3 + c])
        }
      }

      const boxSet = new Set(boxValues)

      if (boxSet.size !== 9 || !NUMBERS.every((num) => boxSet.has(num))) {
        const missing = NUMBERS.filter((x) => !boxSet.has(x))

        if (!complete.hasOwnProperty('boxErrors')) {
          complete.boxErrors = []
        }
        complete.boxErrors.push({
          reason: `Box ${boxIndex} is invalid`,
          location: 'box',
          index: boxIndex,
          missing: missing.toString(),
        })
      }
    }
    if (complete.boxErrors && complete.boxErrors.length > 0) {
      complete.valid = false
    }
  }

  return complete
}

console.log('solved result:', validateCompleteSudoku(aSolved)) // correct - return { valid: true }
console.log('aToSolve result:', validateCompleteSudoku(aToSolve)) // returns false (untouched and incomplete puzzle with zeros throughout)
console.log('wrong result:', validateCompleteSudoku(wrong)) // returns false
