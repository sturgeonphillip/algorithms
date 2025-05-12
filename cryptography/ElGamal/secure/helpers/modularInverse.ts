// helper function for modular multiplicative inverse using Extended Euclidean Algorithm
export function modularInverse(a:bigint, m:bigint) {
  // ensure a is within [0, m)
  a = ((a % m) + m) % m

  if (a === 0n) {
    throw new Error("Modular inverse does not exist.")
  }

  let r = m;
  let oldR = a
  let s = 0n
  let oldS = 1n

  while (r !== 0n) {
    const quotient = oldR / r

    const tempR = r
    r = oldR - quotient * r
    oldR = tempR

    const tempS = s
    s = oldS - quotient * s
    oldS = tempS
  }

  if (oldR !== 1n) throw new Error("Modular inverse does not exist.")

    return ((oldS % m)+ m) % m
}

/**
 * Interval Notation:
 * a compact way to express a numeric range.
 * `[`: inclusive of the lower bound
 * `)`: exclusive of the upper bound
 * "[0, m)" is 'greater than or equal to 0 and strictly less than m`
 * 
 * Usedful for modular arithmetic because it produces results in a canonical range:
 * 0 <= result < modulus
 * Example: `(-3 % 5)` in JS gives `-3` but (((-3 % 5) + 5) % 5) gives `2`, which is in the canonical range `[0, 5)`
 * In `modularInverse` function: `a = ((a % m) + m) % m` ensures that even if `a` is negative, the result is wrapped into the standard non-negative range for modulus.
 */
