import { check } from './check.js'
import { toSolve, solved, wrong} from './puzzles.js'


// console.log(finish(toSolve))
// console.log(check(solved))
// console.log(check(wrong))

function finish(puzzle, d = 1) {
  const stack = []
  
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let current = puzzle[r][c]
      console.log('current', current)
      
      if (current === 0) {
        
          puzzle[r][c] = d
     
        let fit = check(puzzle)
        while (fit !== true) {
          console.log(fit, [r, c], d)
          if (d < 9) {
            puzzle[r][c] = ++d
            return finish(puzzle, d)
            // if puzzle doesn't work with any digit 1 - 9
          } else {
            puzzle[r][c] = 0

            let coords = stack.pop()
            console.log("coords:", coords)
            
               if (coords) {  
              d = puzzle[coords[0]][coords[1]]
              d++;
              puzzle[coords[0]][coords[1]] = d
              return finish(puzzle, d)
              } else {
                return "Puzzle is invalid."
              }
                
            } 

          } 
          // stack.push([r,c])
        }
      }

        }
    return puzzle
 }
 


  //  for (let i = 0; i < 9; i++) {
  //   const row = puzzle[i]

  //   for (let j = 0; j < 9; j++) {
  //     let square = puzzle[i][j]
      
  //     if (square === 0) {
      
  //       // fill square with digit
  //       puzzle
        
  //     }

  //   }
  // }
  


function fillSquare(puzzle, stack, i ,j, d = 1) {
        if (d <= 9) {
          puzzle[i][j] = d
          const candidate = check(puzzle)
          
          if (candidate === true) {
            return [puzzle, stack]
          } else {
            return fillSquare(puzzle, stack, i, j, ++d)
          } 
        } else {
          if (stack.length === 0) {
            return {valid: false, stack: 'stack is empty'}
          }
          const [prevI, prevJ] = stack.pop()
          return fillSquare(puzzle, stack, prevI, prevJ, ++d)
        }
      }


console.log(finish(toSolve))

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
