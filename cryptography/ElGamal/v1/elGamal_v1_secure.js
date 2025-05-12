// @ts-nocheck
/**
 * ElGamal Encryption Implementation
 *
 * This implements the ElGamal encryption system, a public-key cryptosystem
 * based on the Diffie-Hellman key exchange.
 */

// Helper function for modular exponentiation (a^b mod n)
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

// Helper function for modular inverse using Extended Euclidean Algorithm
function modInverse(a, m) {
  a = ((a % m) + m) % m;

  if (a === 0n) {
    throw new Error("Modular inverse does not exist");
  }

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

// Cryptographically secure primitive root finder
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

// Key generation
function generateKeys(bitLength) {
  const min = 2n ** BigInt(bitLength - 1);
  const max = 2n ** BigInt(bitLength) - 1n;

  let p;
  do {
    p = BigInt.asUintN(bitLength, BigInt(Math.floor(Math.random() * Number(max - min))) + min);
  } while (!isProbablyPrime(p));

  const g = findPrimitiveRoot(p);
  const a = 2n + BigInt(Math.floor(Math.random() * 1000)); // private key
  const A = modPow(g, a, p); // public key

  return { p, g, a, A };
}

// ElGamal encryption
function encrypt(message, publicKey) {
  const { p, g, A } = publicKey;
  const m = BigInt(message);
  const b = 2n + BigInt(Math.floor(Math.random() * 1000));
  const B = modPow(g, b, p);
  const s = modPow(A, b, p);
  const c = (m * s) % p;
  return { B, c };
}

// ElGamal decryption
function decrypt(ciphertext, privateKey, p) {
  const { B, c } = ciphertext;
  const s = modPow(B, privateKey, p);
  const s_inv = modInverse(s, p);
  const m = (c * s_inv) % p;
  return m;
}

// Basic primality check (not cryptographically secure)
function isProbablyPrime(n) {
  if (n < 2n) return false;
  for (let i = 2n; i * i <= n; i++) {
    if (n % i === 0n) return false;
  }
  return true;
}

// Use this in real settings
const secureBitLength = 2048;

function example() {
  const keys = generateKeys(secureBitLength);
  console.log("Keys:", keys);

  const message = 123456789n;
  const encrypted = encrypt(message, keys);
  console.log("Encrypted:", encrypted);

  const decrypted = decrypt(encrypted, keys.a, keys.p);
  console.log("Decrypted:", decrypted.toString());
}

// Run example
example();
