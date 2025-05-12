import { modularExponentiation } from './helpers/modularExponentiation'
import { modularInverse } from './helpers/modularInverse'

export function decrypt(privateKey, publicKey, ciphertext) {
  const { a } = privateKey
  const { p } = publicKey
  const { B, c } = ciphertext
  const s = modularExponentiation(B, a, p)
  const sInv = modularInverse(s, p)
  const m = (c * sInv) % p

  return m
}
