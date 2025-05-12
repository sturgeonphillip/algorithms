import crypto from 'node:crypto'

export function randomBigIntBetween(min:bigint, max:bigint ) {
  const range = max - min
  const bytes = Math.ceil(range.toString(2).length / 8)

  let rnd: bigint

  do {
    const buf = crypto.randomBytes(bytes)
    rnd = BigInt('0x' + buf.toString('hex'))
  } while (rnd > range)


    return min + rnd
}
