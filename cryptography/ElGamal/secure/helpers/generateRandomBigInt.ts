import crypto from 'node:crypto'

// secure random BigInt generator
export function generateRandomBigInt(bitLength: number) {
  const byteLength = Math.ceil(bitLength / 8)
  const buf = crypto.randomBytes(byteLength)

  let bigint = BigInt('0x' + buf.toString('hex'))

  return bigint
}
