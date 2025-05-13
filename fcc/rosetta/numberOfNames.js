// 9 Billion Names of God
/** first attempt */
function numberOfNames(num) {
  //  row n corresponds to int n
  // column c in row m corresponds to number of names beginning with c
  // note that the sum of the nth row p(n) is the integer partition function

  // implement: function that returns the sum of the nth row

  // recursive compute how many partitions of c correspond to number of names begin with c
  // recurse quantity of names start with c
  // [k] + partition of (n - k), each part >= k

  // sum = value of each column c for row n
  // k = how many ways to equal 6 that start with c?
  // for n = 6, row[c] = k
  
  
  let sum = 1
  let c = 1
  
  while (c <= num) {
    // let k = findWays(n, c) -> recursive to find k
    sum += k
    c++
  } 
  //
  return sum;
}


function findWays(n, c, k = 1) {
  let k = 1
  let value = c
  // subtract value from n, handle remainder
  // if (base case) return k
    // i think base case is potentially one of these:
      // value === 1
      //  remainder === 0
      // value === 1 AND remainder === 0
  
  // recursive part:
     // if n - val has a remainder: 
      // if (remainder > val) c = val 
      // if (remainder < c) c = val - 1
      // findWays(n, val, k)
  
  
  return k
}

console.log(findWays(6, 3))
// console.log(numberOfNames(1)) // 1 -> "1"
// console.log(numberOfNames(2)) // 2 -> "2", "1+1"
// console.log(numberOfNames(3)) // 3 -> "3", "1+1+1", "2+1"
// console.log(numberOfNames(4)) // 5 -> "4", "1+1+1+1", "2+1+1", "2+2", "3+1",
// console.log(numberOfNames(5)) // 7 -> "5", "1+1+1+1+1", "2+1+1+1", "2+2+1", "3+1+1", "3+2", "4+1"
// console.log(numberOfNames(12)) // 77
// console.log(numberOfNames(18)) // 385
// console.log(numberOfNames(23)) // 1255
// console.log(numberOfNames(42)) // 53174
// console.log(numberOfNames(123)) // 2552338241

function numNames(num) {
  let sum = 1
  let c = 1
  while (c <= num) {
    let k = findAllWays(num, c, w)
    sum += k
    c++
  }

  return sum
}

function findAllWays(n, c, w = 1) {
  let val = c
  // subtract val from n, handle remainder
  // if (base case) return w
  // base case is potentially one of these:
    // val === 1
    // remainder === 0
    // val === 1 && remainder === 0

  // recursive part
    // if (n - val) has a remainder
    // if (remainder > val) c = val
    // if (remainder < c) c = val - 1
    // findAllWays(n, val, w += 1)

  // return w
}

/**
 * Notes:
 * right track conceptually, but need to refine
 * recap findWays(n, c) to count number of partitions of n start with c (and next values in partition must be >= c, non-increasing order)
 * 
 *** correct base case: 
 * if partitioning n starting with part c, then:
 * remainder = n - c
 * if (remainder === 0) valid partition, return 1
 * if (remainder < c) not valid partition, return 0
 * 
 * *** recursive case:
 * try all values i from c to remainder, and for each i, recurse on remainder with starting part i
 * 
 *** *** corrected code *** ***
 *
 * function main(n) {
 *  let sum = 0
 *  let c = 1
 * 
 *  while (c <= n) {
 *    sum += findWays(n, c)
 *    c++
 *  }
 *  
 *  return sum
 * }
 * 
 * function findWays(n, c) {
 *  let rem = n - c
 * 
 *  if (rem === 0) return 1
 *  if (rem < c) return 0
 * 
 *  let total = 0
 * 
 *  for (let i = c; i <= rem; i++) {
 *    total += findWays(rem, i)
 *  }
 * 
 *  return total
 * }
 * 
 * 
 * example main(4)
 * sum = 0, c = 1
 * while (c <= 4)
 * sum += findWays(4, 1) 
 * 
 * findWays recursion stages
 * a -->
 *    rem = 4 - 1 // 3
 *    bc: 3 !== 0 && 3 !< 1 ==> no return
 *
 *    total = 0
 *  
 *    for (let i = 1; i <= 3; i++) {
 *      total += findWays(3, 1)
 *    }
 *    
 * b --> rem = 3 - 1 // 2
 *     bc: 2 !== 0 && 2 !< 1 ==> no return
 *     total = 0
 *     for (let i = 1; i <= 2; i++) {
 *       total += findWays(2, 1)
 *     }
 * 
 * c --> rem = 2 - 1 // 1
 *     bc: 1 !== 0 && 1 !< 1 ==> no return
 *     total = 0
 *     for (let i = 1; i <= 1; i++ ) {
 *        total += findWays(1, 1) 
 *      }
 * 
 * d --> rem = 1 - 1 // 0
 *     bc: 0 === 0 return 1 ==> total += 1
 * 
 * c -> for loop i(1) <= 1, c pops off, back to b
 * 
 * b -> i is now 2 for findWays(1, 2)
 * 
 */
const memo = {}
function reviseWays(n, c) {
  const key = `${n}, ${c}`
  if (key in memo) return memo[key]

  const rem = n - c
  if (rem === 0) return 1
  if (rem < c) return 0

  let total = 0

  for (let i = c; i <= rem; i++) {
    total += findWays(rem, i)
  }

  memo[key] = total
  return total
  
  }
