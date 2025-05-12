import { findPrimitiveRoot } from './findPrimitiveRoot'
import { modularExponentiation } from './modularExponentiation'
import { generateRandomPrime } from './generateRandomPrime'

// key generation
export function generateKeys(bitLength: number) {
  const p = generateRandomPrime(bitLength)
  const g = findPrimitiveRoot(p)

  // private key
  const a = 2n + BigInt(Math.floor(Math.random() * 1000))
  // public key
  const A = modularExponentiation(g, a, p)
  
  return { p, g, a, A }
}
