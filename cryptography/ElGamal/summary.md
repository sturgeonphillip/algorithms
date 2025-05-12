# ElGamal Encryption Implementation

## Overview
In ElGamal encryption, Alice and Bob publicly agree on two non-secret numbers, a common number `g` known as the generator, and `p` to denote the prime modulus. Independently, Alice chooses secret `a` and Bob chooses secret `b`.

### Key Generation
Public keys are created by mixing a secret (`a` or `b`) with the common number `g`, raising the common to the power of the secret and taking the remainder using modulus `p`.
* Alice creates her public key: `A = g^a mod p`
* Bob creates his public key: `B = g^b mod p`

### Diffie-Hellman Key Exchange
This protocol allows both parties to create the same shared secret `s` without directly transmitting it is called the Diffie-Hellman key exchange.

1. Bob computes `s = A^b mod p`
  * which is equal to `(g^a)^b mod p`
  * simplifies to `g^(ab) mod p`
2. Alice computes `s = B^a mod p`
  * which equals `(g^b)^a mod p`
  * simplified as `g^(ab) mod p`

(Note: sometimes secret `s` is labelled `k` for key)

## Encryption and Decryption
This shared secret is then used in the ElGamal encryption and decryption system.
  

* Encryption - `c = m * s mod p`
  1. Bob generates a random ephemeral key `b` (a nonce)
  2. Bob calculates `B = g^b mod p`
  3. Bob calculates the shared secret `s = A^b mod p`
  4. Bob encrypts the message `c = m * s mod p`
  5. Bob sends the ciphertext pair `(B, c)` to Alice


* Decryption - `m = c * s^(-1) mod p`
  1. Alice calculates the shared secret `s = B^a mod p`
  2. Alice finds the modular multiplicative inverse `s^(-1) mod p`
  3. Alice recovers the message `m = c * s^(-1) mod p`
    - which expands to `(m * s) * s^(-1) mod p`
    - simplified as `m * (s * s^(-1)) mod p`
    - since `s * s^(-1) === 1 mod p`, it equals `m * 1 mod p = m`

### Security Basis
The security of ElGamal relies on the computational difficulty of the Discrete Logarithm Problem (DLP).
Even if an attacker knows `g`, `p`, `A`, and `B`, they cannot easily determine `a` or `b` to compute the shared secret.

### Core Components
- *key generation (public and private)*: creates public and private key pairs
- *encryption function* `encrypt(publicKey, m)` takes an object containing the recipient's public key `{p, g, A}` and the plaintext message `m` to encrypt (which must be less than p)
- *decryption function*: `decrypt(privateKey, publicKey, ciphertext)` takes the private key, public parameters, and the ciphertext pair `(B, c)` and recovers the original message

### Helper Functions
- `modPow(base, exponent, modulus)`: efficient modular exponentiation `(a^b mod n)`
- `modInverse(a, m)`: calculates the modular multiplicative inverse using the Extended Euclidean Algorithm
- `isProbablyPrime(n, k)`: Miller-Rabin primality test for generating secure primes
- `generateRandomPrime(min, max)`: generates a random prime number within a range
- `findPrimitiveRoot(p)`: finds a primitive root modulo p (an element whose powers generate all non-zero elements of the field)

## Complete Example Usage:
- this complete implementation demonstrates the key generation, encryption, and decryption of the ElGamal cryptosystem 
- detailed comments explain the mathematical operations at each step of the process, showing:
  1. key generation for Alice
  2. encryption of a message using Alice's public key
  3. decryption of the ciphertext using Alice's private key
  
- summary
  - Alice and Bob agree on public parameters `g` and `p`
  - Alice generates her secret key `a` and public key `A = g^a mod p`
  - Bob uses Alice's public key to encrypt a message `m`, generating the ciphertext (`B`, `c`)
  - Alice uses her private key to decrypt the message

## Security Note
----------------
This implementation is intended for **educational purposes only**.
* The default bit length (16 bits) and simplified prime/primitive root generation are not secure for real-world cryptographic use.
* For production, increase the key size (ie to 2048 bits or more) and use robust number theory libraries or well-audited cryptographic libraries.
