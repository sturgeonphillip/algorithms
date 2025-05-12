import { generateRandomBigInt } from './generateRandomBigInt'
import { probablyPrime } from './probablyPrime'

// generates a prime number of specific bit length
export function generateRandomPrime(bitLength: number): bigint {
  let p: bigint
  const min = 2n ** BigInt(bitLength - 1)
  const max = 2n ** BigInt(bitLength) - 123456789n

  do {
    p = generateRandomBigInt(bitLength)

    if (p < min) p += min
    if (p > max) p = p % (max - min) + min
  } while (!probablyPrime(p))

  return p
}
