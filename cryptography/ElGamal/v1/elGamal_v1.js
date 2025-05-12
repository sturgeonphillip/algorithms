/**
 * ElGamal Encryption Implementation
 * 
 * This implements the ElGamal encryption system, a public-key cryptosystem
 * based on the Diffie-Hellman key exchange.
 */

// Helper function for modular exponentiation (a^b mod n)
// lines 9 - 26; 17
function modPow(base, exponent, modulus) {
  if (modulus === 1) return 0;
  
  let result = 1;
  base = base % modulus;
  
  while (exponent > 0) {
    // If exponent is odd, multiply base with result
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    // Exponent must be even now
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }
  
  return result;
}

// Helper function for modular multiplicative inverse using Extended Euclidean Algorithm
// lines 31 - 56; 25
function modInverse(a, m) {
  // Ensure a is positive
  a = ((a % m) + m) % m;
  
  if (a === 0) {
    throw new Error("Modular inverse does not exist");
  }
  
  // Extended Euclidean Algorithm
  let [old_r, r] = [a, m];
  let [old_s, s] = [1, 0];
  
  while (r !== 0) {
    const quotient = Math.floor(old_r / r);
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
  }
  
  // If gcd(a, m) != 1, modular inverse doesn't exist
  if (old_r !== 1) {
    throw new Error("Modular inverse does not exist");
  }
  
  // Make sure the result is positive
  return ((old_s % m) + m) % m;
}

// Function to check if a number is probably prime using Miller-Rabin test
// lines 60 - 95; 35
function isProbablyPrime(n, k = 5) {
  if (n <= 1 || n === 4) return false;
  if (n <= 3) return true;
  if (n % 2 === 0) return false;
  
  // Write n as 2^r * d + 1
  let d = n - 1;
  let r = 0;
  while (d % 2 === 0) {
    d /= 2;
    r++;
  }
  
  // Witness loop
  for (let i = 0; i < k; i++) {
    // Random number in [2, n-2]
    const a = 2 + Math.floor(Math.random() * (n - 4));
    let x = modPow(a, d, n);
    
    if (x === 1 || x === n - 1) continue;
    
    let continueOuterLoop = false;
    for (let j = 0; j < r - 1; j++) {
      x = modPow(x, 2, n);
      if (x === n - 1) {
        continueOuterLoop = true;
        break;
      }
    }
    
    if (continueOuterLoop) continue;
    return false;
  }
  
  return true;
}

// Function to generate a random prime number within a range
// lines 98 - 108; 10
function generateRandomPrime(min, max) {
  let num;
  do {
    num = min + Math.floor(Math.random() * (max - min));
    // Ensure num is odd
    if (num % 2 === 0) num++;
  } while (!isProbablyPrime(num));
  
  return num;
}

// Function to generate a primitive root modulo p
// lines 112 - 139; 27
const bitLength = 16
const secureBitLength = 2048
function findPrimitiveRoot(p) {
  // This is a simplified implementation - in practice, more complex checks are needed
  // For demonstration purposes, we'll use a simple approach
  
  // Start with a small value
  let g = 2;
  while (g < p) {
    // Try to find a primitive root
    let isRoot = true;
    
    // Check if g^(p-1) ≡ 1 (mod p)
    if (modPow(g, p - 1, p) !== 1) {
      isRoot = false;
    }
    
    // Additional check: g^((p-1)/q) should not be 1 mod p for any prime factor q of p-1
    // This is a simplified check - normally we would check all prime factors
    const factor = 2; // As p-1 is always even, 2 is a factor
    if (modPow(g, (p - 1) / factor, p) === 1) {
      isRoot = false;
    }
    
    if (isRoot) return g;
    g++;
  }
  
  throw new Error("Primitive root not found");
}

/**
 * ElGamal Key Generation
 * @param {number} bitLength - Approximate bit length of prime p
 * @returns {Object} An object containing public and private keys
 */
// lines 147 - 166; 19
function generateKeys(bitLength = 16) {
  // 1. Generate a large prime p
  const min = 2 ** (bitLength - 1);
  const max = 2 ** bitLength - 1;
  const p = generateRandomPrime(min, max);
  
  // 2. Find a primitive root g modulo p
  const g = findPrimitiveRoot(p);
  
  // 3. Generate Alice's private key a (random integer 1 < a < p-1)
  const a = 1 + Math.floor(Math.random() * (p - 2));
  
  // 4. Calculate Alice's public key A = g^a mod p
  const A = modPow(g, a, p);
  
  return {
    publicKey: { p, g, A },
    privateKey: { a }
  };
}

/**
 * ElGamal Encryption
 * @param {Object} publicKey - The recipient's public key {p, g, A}
 * @param {number} m - The message to encrypt (must be less than p)
 * @returns {Object} An object containing the encrypted message (B, c)
 */
// lines 175 - 197; 22
function encrypt(publicKey, m) {
  const { p, g, A } = publicKey;
  
  // Ensure message is within the valid range
  if (m <= 0 || m >= p) {
    throw new Error(`Message must be between 1 and ${p-1}`);
  }
  
  // 1. Bob chooses a random ephemeral key b
  const b = 1 + Math.floor(Math.random() * (p - 2));
  
  // 2. Bob calculates B = g^b mod p
  const B = modPow(g, b, p);
  
  // 3. Bob calculates the shared secret s = A^b mod p = g^(ab) mod p
  const s = modPow(A, b, p);
  
  // 4. Bob encrypts the message: c = m * s mod p
  const c = (m * s) % p;
  
  // Return the ciphertext pair (B, c)
  return { B, c };
}

/**
 * ElGamal Decryption
 * @param {Object} privateKey - The recipient's private key {a}
 * @param {Object} publicKey - The recipient's public key {p}
 * @param {Object} ciphertext - The encrypted message {B, c}
 * @returns {number} The decrypted message
 */
// lines 207 - 222; 15
function decrypt(privateKey, publicKey, ciphertext) {
  const { a } = privateKey;
  const { p } = publicKey;
  const { B, c } = ciphertext;
  
  // 1. Alice calculates the shared secret s = B^a mod p = g^(ab) mod p
  const s = modPow(B, a, p);
  
  // 2. Alice calculates the modular multiplicative inverse of s
  const sInverse = modInverse(s, p);
  
  // 3. Alice decrypts the message: m = c * s^(-1) mod p
  const m = (c * sInverse) % p;
  
  return m;
}

// Example usage
// lines 226 - 249; 23
function example() {
  // 1. Generate keys
  console.log("Generating keys...");
  const keys = generateKeys();
  console.log("Public key:", keys.publicKey);
  console.log("Private key:", keys.privateKey);
  
  // 2. Original message
  const message = 42;
  console.log(`\nOriginal message: ${message}`);
  
  // 3. Encrypt the message
  console.log("\nEncrypting message...");
  const ciphertext = encrypt(keys.publicKey, message);
  console.log("Ciphertext:", ciphertext);
  
  // 4. Decrypt the message
  console.log("\nDecrypting message...");
  const decryptedMessage = decrypt(keys.privateKey, keys.publicKey, ciphertext);
  console.log(`Decrypted message: ${decryptedMessage}`);
  
  // 5. Verification
  console.log(`\nVerification: ${message === decryptedMessage ? "Success!" : "Failed!"}`);
}

// Run the example
example();


// lines 9 - 26; 17
// lines 31 - 56; 25
// lines 60 - 95; 35
// lines 98 - 108; 10
// lines 112 - 139; 27
// lines 147 - 166; 19
// lines 175 - 197; 22
// lines 207 - 222; 15
// lines 226 - 249; 23
