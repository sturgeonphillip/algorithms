
const crypto = require('crypto');

/**
 * Modular exponentiation (a^b mod n) using BigInt
 */
function modPow(base, exponent, modulus) {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;

  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }

  return result;
}

/**
 * Extended Euclidean Algorithm for modular inverse
 */
function modInverse(a, m) {
  a = ((a % m) + m) % m;

  if (a === 0n) throw new Error("Modular inverse does not exist");

  let [old_r, r] = [a, m];
  let [old_s, s] = [1n, 0n];

  while (r !== 0n) {
    const quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
  }

  if (old_r !== 1n) throw new Error("Modular inverse does not exist");
  return ((old_s % m) + m) % m;
}

/**
 * Miller-Rabin probabilistic primality test
 */
function isProbablyPrime(n, k = 5) {
  if (n === 2n || n === 3n) return true;
  if (n < 2n || n % 2n === 0n) return false;

  let r = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    r += 1n;
  }

  outer: for (let i = 0; i < k; i++) {
    const a = 2n + BigInt(crypto.randomInt(Number(n - 4n)));
    let x = modPow(a, d, n);

    if (x === 1n || x === n - 1n) continue;

    for (let j = 0n; j < r - 1n; j++) {
      x = modPow(x, 2n, n);
      if (x === n - 1n) continue outer;
    }

    return false;
  }

  return true;
}

/**
 * Secure random BigInt generator
 */
function generateRandomBigInt(bitLength) {
  const byteLength = Math.ceil(bitLength / 8);
  const buf = crypto.randomBytes(byteLength);
  let bigint = BigInt('0x' + buf.toString('hex'));
  return bigint;
}

/**
 * Generates a prime number of specified bit length
 */
function generateRandomPrime(bitLength) {
  let p;
  const min = 2n ** BigInt(bitLength - 1);
  const max = 2n ** BigInt(bitLength) - 1n;

  do {
    p = generateRandomBigInt(bitLength);
    if (p < min) p += min;
    if (p > max) p = p % (max - min) + min;
  } while (!isProbablyPrime(p));

  return p;
}

/**
 * Finds a primitive root modulo p
 */
function findPrimitiveRoot(p) {
  const phi = p - 1n;
  const factors = [];
  let n = phi;

  for (let i = 2n; i * i <= n; i++) {
    if (n % i === 0n) {
      factors.push(i);
      while (n % i === 0n) n /= i;
    }
  }
  if (n > 1n) factors.push(n);

  for (let g = 2n; g < p; g++) {
    let isPrimitive = true;
    for (const factor of factors) {
      if (modPow(g, phi / factor, p) === 1n) {
        isPrimitive = false;
        break;
      }
    }
    if (isPrimitive) return g;
  }

  throw new Error("No primitive root found");
}

/**
 * Key generation
 */
function generateKeys(bitLength = 2048) {
  const p = generateRandomPrime(bitLength);
  const g = findPrimitiveRoot(p);
  const a = 2n + generateRandomBigInt(256); // private key (small)
  const A = modPow(g, a, p); // public key

  return { publicKey: { p, g, A }, privateKey: { a } };
}

/**
 * ElGamal encryption
 */
function encrypt(publicKey, message) {
  const { p, g, A } = publicKey;
  const m = BigInt(message);
  const b = 2n + generateRandomBigInt(256);
  const B = modPow(g, b, p);
  const s = modPow(A, b, p);
  const c = (m * s) % p;
  return { B, c };
}

/**
 * ElGamal decryption
 */
function decrypt(privateKey, publicKey, ciphertext) {
  const { a } = privateKey;
  const { p } = publicKey;
  const { B, c } = ciphertext;
  const s = modPow(B, a, p);
  const s_inv = modInverse(s, p);
  const m = (c * s_inv) % p;
  return m;
}

/**
 * Example usage
 */
function example() {
  console.log("Generating keys (this may take a moment)...");
  const keys = generateKeys(512); // Reduced for demo speed
  const message = 123456789n;

  console.log("Original:", message.toString());
  const ciphertext = encrypt(keys.publicKey, message);
  console.log("Ciphertext:", ciphertext);
  const decrypted = decrypt(keys.privateKey, keys.publicKey, ciphertext);
  console.log("Decrypted:", decrypted.toString());
}

example();
