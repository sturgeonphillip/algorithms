import { generateRandomBigInt } from './helpers/generateRandomBigInt'
import { modularExponentiation } from './helpers/modularExponentiation'

export function encrypt(publicKey, message) {
  const { p, g, A } = publicKey

  const m = BigInt(message)
  const b = 2n + generateRandomBigInt(256)
  const B = modularExponentiation(g, b, p)
  const s = modularExponentiation(A, b, p)
  const c = (m * s) % p

  return { B, c }
}
