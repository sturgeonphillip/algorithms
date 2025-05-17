// optimization:
// loops once over the grid (still O(1) time overall)
// reduces overhead and makes the logic easier to parallelize
// defensive check - matrix is 9 x 9 & vals are 0 - 9
export function check(matrix) {
  const rowSets = Array.from({ length: 9 }, () => new Set())
  const colSets = Array.from({ length: 9 }, () => new Set())
  const boxSets = Array.from({ length: 9 }, () => new Set())
  
  // traverse
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = matrix[r][c]
      if (val === 0) continue

      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3)

      if (rowSets[r].has(val)) return false // [ false, 'duplicate in row:', r, val]
      if (colSets[c].has(val)) return false // [ false, 'duplicate in column:', c, val]
      if (boxSets[boxIdx].has(val)) return false // [ false, 'duplicate in box:', boxIdx, 'value:', val]

      rowSets[r].add(val)
      colSets[c].add(val)
      boxSets[boxIdx].add(val)
    }
  }

  return true
}
