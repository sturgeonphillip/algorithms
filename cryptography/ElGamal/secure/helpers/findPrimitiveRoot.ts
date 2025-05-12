import { modularExponentiation } from './modularExponentiation'

// cryptographically secure primitive root finder
export function findPrimitiveRoot(p: bigint) {
  const phi = p - 1n
  const factors:bigint[] = []

  let n = phi
  for (let i = 2n; i * i <= n; i++) {
    if (n % i === 0n) {
      factors.push(i)

      while(n % i === 0n) {
        n /= i
      }
    }
  }

  if (n > 1n) {
    factors.push(n)
  }

  for (let g = 2n; g < p; g++) {
    let isPrimitive = true

    for (const factor of factors) {
      if (modularExponentiation(g, phi / factor, p) === 1n) {
        isPrimitive = false

        break
      }
    }

    if (isPrimitive) {
      return g
    }
  }

  throw new Error("No primitive root found.")
}
