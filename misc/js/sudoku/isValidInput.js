// precheck to ensure input meets basic sudoku criteria
export function isValidInput(matrix) {
  // testing/dev contexts
  // @ts-ignore
  if (process.env.NODE_ENV !== 'production') {
    console.log('process.env is in dev mode')
  }

  if (!Array.isArray(matrix) || matrix.length !== 9) return false

  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== 9) return false
    for (const val of row) {
      if (!Number.isInteger(val) || val < 0 || val > 9) return false
    }
  }

  return true
}
