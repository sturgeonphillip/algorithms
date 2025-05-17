import { check } from "./check.js";
import { toSolve } from "./puzzles.js";

function solveSudokuStack(puzzle) {
  const stack = [];

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let current = puzzle[r][c];
      // console.log("current", current);

      if (current === 0) {
        // push current coordinates onto the stack
        stack.push([r, c]);
        for (let d = 1; d <= 9; d++) {
          // set to a value
          puzzle[r][c] = d;
          // check if placed d is valid
          if (check(puzzle)) {
            // recurse to fill the next cell
            const result = solveSudokuStack(puzzle);

            if (result) {
              return result;
            }
          }
        }

        // if no valid digit can be placed, reset the cell and backtrack
        puzzle[r][c] = 0;
        // remove last open coordinates from stack
        stack.pop();
        return null;
      }
    }
  }
  return puzzle;
}

console.log(solveSudokuStack(toSolve));

/** *** *** *** *** *** *** */
// Now that we have a function to check for a valid puzzle, I'm creating the function that will fill in empty/open squares (that start as 0)
// Don't give me the algorithm and don't show me the code, just assist by answering questions (giving hints) as I try to write the correct functions. Right now, my logic:

// loop through the provided incomplete puzzle to check each square
// if square is not a 0, go to next square

// if square is 0
// use helper function to fill the square with a digit 1 - 9
// arguments needed include:
// -> the puzzle's current state
// -> digit d initialized to 1 to fill square
// -> currentSquare & previousSquare for potential backtracking

// use helper function to check for valid puzzle with the updated puzzle[square] = d
// // if valid, go to next 0 square

// // if puzzle is not valid && d < 9
// //   d += 1 and check for valid puzzle with the new digit
// // if not valid && d === 9 we've checked all variants possible with new digit
// //  go to location of previous square that started as 0
// //  if d at previous square is not 9, increment by 1
// //  if previous square is 9, go to the next-most previous square
// //   -> use previousSquare and currentSquare for reassignment

// // how will I know which square is previousSquare?
// Need to capture all squares that have been updated (previously a zero)

// // we'll possibly need to modify our check function

/**
 * You're thinking through this really well -- essentially describing a backtracking algorithm, and your breakdown captures the core flow.
 *
 * Here are answers and hints to your current open questions and points of uncertainty:
 * Q: How will I know which square is previousSquare?
 * A: Hint: use a stack to track both current and previous mutable squares.
 *  - Keep a stack (array) of positions (eg [row, col]) where you placed a value (ie replaced a 0)
 *  - Stack represents the path of decisions you've made.
 *  - When you need to backtrack, pop from the stack to go back to the most recent decision.
 *  - When you make a successful placement, push the [row, col] to the stack.
 *
 * Q: Do I need to modify the check function?
 * A: Hint: not necessarily, but maybe.
 * - Your current check() function validates the entire puzzle.
 * - When filling in a digit, you don' need to recheck the whole board—only the row, column, and box of the square just filled.
 * - To improve performance during recursion/backtracking you can:
 *    1. keep current check() for fallback or final validation
 *    2. create a lighter helper isValidMove(pz, r, c, d) to validate just the one change.
 *
 * Q: How do I structure the loop so that I move forward or backward depending on validity?
 * A: Hint: think of recursion or an index pointer + loop for clean loop logic, as well as avoid scanning the full puzzle at every step.
 * - Use 1 of 2 things:
 * - 1. Recursive calls that move the next zero-square when valid
 * - 2. A loop with an index over the zero-square list and move forward/backward manually
 * - You'll need:
 * - 1. List of all zero-square positions before solving begins
 * - 2. Index i to move forward (i++) when valid and backward (i--) when backtracking.
 *
 * Bonus Hint:
 * - When backtracking and trying the next digit:
 * - reset current square to 0 before backtracking to avoid lingering invalid values.
 */

/**DEBUG:
 *
 * Initial issue: finish() stops prematurely, producing output indicating duplicates in certain rows and columns. The output showed the first 0 in the matrix was at [0,0] but first attempt to change a 0 was at [0,2]
 *
 * Analysis: Premature stopping is due to the solver encountering invalid placements for puzzle[r][c] = d and not correctly managing the backtracking logic. The function was not properly handling state of d and the stack, leading to an inability to revert to previous states.
 *
 * Changes 1:
 * - Moved the stack push operation within the `if (current === 0)` block from the last line of the context and put it at the top of its context on the first line of the block.
 * - Corrected the indexing that accessed the puzzle array.
 * - Removed redundant stack pushes to avoid confusion during backtracking.
 *
 *
 * Continued Issues: finish() function still produced incorrect outcomes. There was still improper handling of d, errors in backtracking logic, and missteps in recursive calls.
 *
 * Changes 2:
 * - Replaced method to increment 0 value squares with a for loop used to iterate through all possible values (1-9) for each found 0, and it still checks validity of puzzle after each placement.
 * - Implemented correct backtracking by resetting squares and managing the stack correctly.
 * - Return completed puzzle when all cells are filled correctly.
 * - changed function name from finish() to solveSudokuStack()
 */
