// @ts-nocheck

// Exercises
// 1. Basic BigInt Practice
// Create two BigInts and try all the arithmetic operations.
const a = 123456789877742069032306210921n
const b = 11241637n

// console.log(a + b)
// console.log(a - b)
// console.log(a * b)
// console.log(a / b) // always returns an integer (no decimals)
// console.log(a % b)
// console.log(a ** b) // RangeError: Maximum BigInt size exceeded


// 2. Implement a `mod` Function
// The `%` operator returns negative remainders for negative numbers. Write a clean `mod(a, m)` function that always returns a positive result
function mod(a, m) {
  return ((a % m) + m) % m
}

// console.log(mod(-3n, 5n)) // 2n
// console.log(mod(12n, 5n)) // 2n

function moddy(x, y) {
  return x % y
}

// console.log(moddy(-7, 3)) // -1
// console.log(moddy(7, -3)) // 1
// console.log(moddy(-99, -11)) // -0
// console.log(moddy(14, 7)) // 0
// console.log(moddy(18, 5)) // 3
// console.log(moddy(18, -5)) // 3
// console.log(moddy(-18, 5)) // 3


// console.log(moddy(-3n, 5n)) // 2n
// console.log(moddy(-12n, 5n)) // 2n


// 3. Modular Exponentiation (key to ElGamal & RSA)
// Write a function `modPow(base, exponent, modulus)` that calculates:
// result = base^exponent mod modulus
function modPow(base, exp, mod)  {
  if (mod === 1n) return 0n

  let result = 1n
  base = base % mod

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod
    }

    exp = exp / 2n
    base = (base * base) % mod
  }

  return result
}

// console.log(modPow(4n, 13n, 497n)) // 445n


// Bonus: Fermat's Little Theorem
// if p is a prime number and a is not divisible by p, then:
//    a^(p-1) === 1 mod p
// write a function that checks Fermat's Little Theorem for a given `a` and prime `p`
function isPrime(n, r = 2n) {
  if (n < 2n) return false
  if (n === r) return true
  if (n % r === 0n) return false

  return isPrime(n, r + 1n)
}

function checkFermat(a, p) {
  const ab = BigInt(a)
  const pb = BigInt(p)

  if (!isPrime(pb)) {
    return `p is not prime (${pb})`
  }

  if (ab % pb === 0n) {
    return `a is divisible by p (${ab} / ${pb} === ${ab / pb})`
  }

  const result = modPow(ab, pb - 1n, p)
  return result === 1n ? true : `Failed: a^(${pb - 1n}) === ${result} (mod ${pb})`
}

console.log(checkFermat(7n, 13n)) // true
console.log(checkFermat(12n, 13n)) // true
console.log(checkFermat(13n, 13n)) // a is divisible by p
console.log(checkFermat(7n, 15n)) // p is not prime
