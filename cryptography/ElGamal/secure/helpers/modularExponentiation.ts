// helper function for a modular exponentiation (a^b mod n)
export function modularExponentiation
(base:bigint, exponent:bigint, modulus:bigint) {
  if (modulus === 1n) return 0n

  let result = 1n
  base = base % modulus

  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus
    }

    exponent = exponent / 2n
    base = (base * base) % modulus
  }

  return result
}
