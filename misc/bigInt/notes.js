// @ts-nocheck
/**
 * BigInt: a numeric primitive in JavaScript that can represent whole numbers larger than Number.MAX_SAFE_INTEGER (~2^53 ~ 9 quadrillion). It's the perfect use case for things like cryptography, where huge numbers are standard.
 * 
 * Note that `BigInt` is not a class. In JS/TS, it's a function like `Number` or `String` that creates a `bigint` value, not a class or type to be instantiated with `new`.
 * The *type* is `bigint` (lowercase), and the constructor-like function is `BigInt()` (uppercase).
 * 
 * const bigV = BigInt(123) // create a bigint value
 * const bigY: bigint = 123n // type annotation using the 'bigint' type 
 * 
 * Because `BigInt` is NOT a constructo, using `new BigInt()` throws a TypeError.
 * 
 * Quick Compare(p: purpose, kw: keyword, ex: example):
 * {
 * p: type annotation, kw: `bigint` (lowercase), ex: `let x: bigint`
 * p: value creation, kw: `BigInt()` function, ex: `let y = BigInt(9)
 * p: literal syntax, kw: `n` suffix, ex: `let z = 42n`
 * }
 * 
 */





// Regular Numbers (limited)
const x = 9007199254740991 // max safe integer
// console.log(x + 1) // 9007199254740992 (okay)
// console.log(x + 2) // 9007199254740992 (inaccurate!)

// BigInt (accurate)
const big = 9007199254740991n;
// console.log(big + 1n) // 9007199254740992n
// console.log(big + 2n) // 9007199254740993n (correct!)

// How to Use BigInt
// declaring BigInt
const a = 123456789123456789123456789n

// operations (all operands must be of type BigInt)
const b = 5n
const c = 2n

// console.log(b + c) // 7n
// console.log(b * c) // 10n
// console.log(b ** c) // 25n
// console.log(b / c) // 2n (no decimals)
// console.log(b % c) // 1n

// Don't mix with regular number types
const d = 10n
const e = 3
// console.log(d + e) // TypeError: Cannot mix BigInt and other types

// to mix
BigInt(e) // convert number to BigInt

/** Quick Experiment */
const bigPrime = 2n ** 256n - 189n
// console.log('bigPrime:', bigPrime) // giant number!

const small = 3n
const result = bigPrime % small
// console.log(result) // 0n, 1n, or 2n

/**
 * Real-World Use Case: Why BigInt?
 * BigInt is essential in:
 * * Cryptographic algorithms (like ElGAmal, RSA)
 * * Blockchain/crypto token math
 * * Precise long-term financial systems
 * * Simulations or math-heavy programs
 * 
 */

/**
 * BigInt is not inherently **bitwise**. It's just a new numeric type in JS designed for arbitrary-precision integers -- meaning it can represent whole numbers that are much bigger than what Number can.
 * 
 * But... bitwise-style operations like shifts (<<, >>) can be used with BigInt, and you're not limited to bit-lengths like `&`, `|`, `^` are in Number.
 */


// Number (standard JS numbers):
/* Use 64-bit floating point
 * safely represent integers up to 2^53 - 1
 * bitwise are 32-bit only
 */
console.log(5 & 3) // 1
console.log(5 << 1) // 10

// BigInt:
/** Use arbitrary precision (goes way beyond 64 bits)
 ** Fully integer - no decimals
 ** Can do arithmetic, modular math, bitwise shifts, etc.
 ** Bitwise operations like `&`, `|`, and `^` are allowed but must all be BigInt
*/
const a = 12345683978940302013471n
const b = 3n

console.log(a * b) // BigInt result
console.log(a << 2n) // also works: left shift 2 bits

/** Internally, BigInt likely uses arrays of binary digits (bits or bytes), so it's implemented in terms of bitwise operations - but you, the developer, don't need to think in bits. You're just writing math. 
 * 
*/
modPow(7n, 65537n, 9999999999999n)
