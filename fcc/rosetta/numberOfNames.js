/** 9 Billion Names of God */
function numberOfNames(num) {
  let sum = 0
  let c = 1

  const memo = {}

  function findWays(n, c) {
    const key = `${n},${c}`
    if (key in memo) return memo[key]
    let rem = n - c

    if (rem === 0) return 1
    if (rem < c) return 0

    let total = 0

    for (let i = c; i <= rem; i++) {
      total += findWays(rem, i)
    }

    memo[key] = total
    return total
    
  }
  while (c <= num) {
    sum += findWays(num, c)
    c++
  }

  return sum
}


console.log(numberOfNames(5))   // should equal 7.
console.log(numberOfNames(12))  // should equal 77.
console.log(numberOfNames(18))  // should equal 385.
console.log(numberOfNames(23))  // should equal 1255.
console.log(numberOfNames(42))  // should equal 53174.
console.log(numberOfNames(123)) // should equal 2552338241.


/** This task is a variation of the short story by Arthur C. Clarke.
 * 
 * (Solvers should be aware of the consequences of completing this task.)
 * 
 * In detail, to specify what is meant by a "name":
 * 
 * * The integer 1 has 1 name: "1"
 * * The integer 2 has 2 names: "1+1" and "2"
 * * The integer 3 has 3 names: "1+1+1", "2+1", "3"
 * * The integer 4 has 5 names: "1+1+1+1", "2+1+1", "2+2", "3+1", "4"
 * * The integer 5 has 7 names: "1+1+1+1+1", "2+1+1+1", "2+2+1", "3+1+1", "4+1", "5"
 * 
 * It can be visualized like this:
 * 
 *          1
 *        1   1
 *      1   1   1
 *     1  2   1   1
 *   1   2   2   1   1
 * 1   3   3   2   1   1
 * 
 * Where row n corresponds to integer n, and each column c in row m from left to right corresponds to the number of names beginning with c.
 * 
 * Optionally note that the sum of the nth row P(n) is the integer partition function.
 * 
 * Implement a function that returns the sum of the nth row.
 * 
 */
