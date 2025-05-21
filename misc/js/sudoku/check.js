// do i need a defensive check that the input matrix is 9 x 9 and its vals are 0 - 9?

// optimized to:
// reduce overhead and makes the logic easier to parallelize
export function check(matrix) {
  const rowSets = Array.from({ length: 9 }, () => new Set())
  const colSets = Array.from({ length: 9 }, () => new Set())
  const boxSets = Array.from({ length: 9 }, () => new Set())

  // traverse once over the grid - O(1) time overall
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = matrix[r][c]
      if (val === 0) continue

      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3)

      if (
        rowSets[r].has(val) ||
        colSets[c].has(val) ||
        boxSets[boxIdx].has(val)
      ) {
        return false
      }

      rowSets[r].add(val)
      colSets[c].add(val)
      boxSets[boxIdx].add(val)
    }
  }
  // no repeats, all sets of all rows, columns, and boxes are unique
  return true
}
