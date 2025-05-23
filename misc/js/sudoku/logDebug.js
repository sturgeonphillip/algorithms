// provide dev-time insights without interference in production
export function logDebug(...args) {
  //@ts-ignore
  if (process.env.NODE_ENV !== 'production') {
    const timestamp = new Date().toISOString()
    console.log(`[DEBUG] - ${timestamp}`, ...args)
  }
}

/**
 * example use case:
 * -> inside a function
 * function fillFromStack(idx) {
 * // ...
 * // inside for loop and conditional to check if sets have d {
 *    // puzzle[r][c] = d, add to sets...
 *     logDebug(`Trying ${d} at [${r}, ${c}]`)
 *
 *     if (fillFromStack(idx + 1)) return true
 *
 *     // puzzle[r][c] = 0, delete from sets...
 *     logDebug(`Backtracking from [${r}, ${c}], tried ${d}`)
 *   }
 * }
 *
 * -> multiple arguments
 * logDebug('Current cell', `[${r}, ${c}]`, 'Candidate:', d, 'Box index:', box)
 */
