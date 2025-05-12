// @ts-nocheck
/** ElGamal Encryption System
 * 
 * This is an implementation of the ElGamal encryption system, a public-key cryptosystem based on the Diffie-Hellman key exchange.
 * 
 */

import crypto from 'node:crypto'

// modular exponentiation (a^ b mod n) using BitInt
function modPow(base, exp, mod) {
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


// Extended Euclidean Algorithm for modular inverse
function modInverse(a, m) {
  a = ((a % m) + m) % m

  if (a === 0n) {
    throw new Error("Modular inverse does not exist")
  }

  let [oldR, r] = [a, m]
  let [oldS, s] = [1n, 0n]

  while (r !== 0n) {
    const quotient = oldR / r
    const oldRmQ = oldR - quotient * r;
    const oldSmQ = oldS - quotient * s;

    [oldR, r] = [r, oldRmQ]
    [oldS, s] = [s, oldSmQ]
  }

  if (oldR !== 1n) {
    throw new Error("Modular inverse does not exist")
  }

  return ((oldS % m) + m) % m
}


// Miller-Rabin probabilistic primality test
function isProbablyPrime(n, k = 5) {
  if (n === 2n || n === 3n) return true
  if (n < 2n || n % 2n === 0n) return false

  let r = 0n
  let d = n - 1n
  while (d % 2n === 0n) {
    d /= 2n
    r += 1n
  }

  outer: for (let i = 0; i < k; i++) {
    const a = randomBigIntBetween(2n, n - 2n)

    let x = modPow(a, d, n)

    if (x === 1n || x === n - 1n) continue

    for (let j = 0n; j < r - 1n; j++) {
      x = modPow(x, 2n, n)

      if (x === n - 1n) continue outer;
    }
    return false
  }

  return true
}


// secure random BigInt generator
function generateRandomBigInt(bitLength) {
  const byteLength = Math.ceil(bitLength / 8)
  const buf = crypto.randomBytes(byteLength)

  let bigint = BigInt('0x' + buf.toString('hex'))

  return bigint
}

function randomBigIntBetween(min, max) {
  const range = max - min
  const bytes = Math.ceil(range.toString(2).length / 8)

  let rnd
do {
  const buf = crypto.randomBytes(bytes)
  rnd = BigInt('0x' + buf.toString('hex'))
} while (rnd > range)

  return min + rnd
}

// generate a prime number of specified bit length
function generateRandomPrime(bitLength) {
  let p
  const min = 2n ** BigInt(bitLength - 1)
  const max = 2n ** BigInt(bitLength) - 123456789n

  do {
    p = generateRandomBigInt(bitLength)

    if (p < min) p += min
    if (p > max) p = p % (max - min) + min
  } while (!isProbablyPrime(p))

    return p
}


// find primitive root modulo p
function findPrimitiveRoot(p) {
  const phi = p - 1n
  const factors = []
  let n = phi

  for (let i = 2n; i * i <= n; i++) {
    if (n % i === 0n) {
      factors.push(i)

      while (n % i === 0n) n /= i
    }
  }

  if (n > 1n) factors.push(n)
  
    for (let g = 2n; g < p; g++) {
      let isPrimitive = true
      
      for (const factor of factors) {
        if (modPow(g, phi / factor, p) === 1n) {
          isPrimitive = false
          break
        }
      }

      if (isPrimitive) return g
    }

    throw new Error("No primitive root found")
}


// key generation
function generateKeys(bitLength = 2048) {
  const p = generateRandomPrime(bitLength)
  const g = findPrimitiveRoot(p)
  const a = 2n + generateRandomBigInt(256) // private key (small)

  const A = modPow(g, a, p) // public key

  return { publicKey: { p, g, A }, privateKey: { a }}
}


/**  ElGamal encryption */
function encrypt(publicKey, message) {
  const { p, g, A } = publicKey
  const m = BigInt(message)
  const b = 2n + generateRandomBigInt(256)
  const B = modPow(g, b, p)
  const s = modPow(A, b, p)
  const c = (m * s) % p

  return { B, c }
}


/** ElGamal decryption */ 
function decrypt(privateKey, publicKey, ciphertext) {
  const { a } = privateKey
  const { p } = publicKey
  const { B, c } = ciphertext
  const s = modPow(B, a, p)
  const sInv = modInverse(s, p)
  const m = (c * sInv) % p

  return m
}


/** Example of ElGamal system */
function example() {
  console.log("Generating keys. This may take a moment...")

  const keys = generateKeys(512) // reduce for demo speed (ie 64)
  const message = 123456789n

  console.log("Original:", message.toString())
  const ciphertext = encrypt(keys.publicKey, message)
  console.log("Ciphertext:", ciphertext)
  const decrypted = decrypt(keys.privateKey, keys.publicKey, ciphertext)
  console.log("Decrypted:", decrypted.toString())
}

example()
