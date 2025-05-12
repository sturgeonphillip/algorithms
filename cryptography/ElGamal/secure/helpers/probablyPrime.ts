import { modularExponentiation } from './modularExponentiation'
import { randomBigIntBetween } from './randomBigIntBetween'


// Miller-Rabin probabilistic primality test
export function probablyPrime(n:bigint, k:number = 5) {
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

    let x = modularExponentiation(a, d, n)

    if (x === 1n || x === n - 1n) continue

    for (let j = 0n; j < r - 1n; j++) {
      x = modularExponentiation(x, 2n, n)

      if (x === n - 1n) continue outer
    }

    return false
  }
  return true
}
