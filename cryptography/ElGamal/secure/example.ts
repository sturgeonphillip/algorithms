import { generateKeys } from './helpers/generateKeys'
import { encrypt } from './encrypt'
import { decrypt } from './decrypt'

// example implementation
export function example() {
  console.log("Generating keys. This may take a moment...")

  const keys = generateKeys(512)
  const message = 123456789n

  const publicKey = {
    p: keys.p,
    g: keys.g,
    A: keys.A
  }

  const privateKey = {
    a: keys.a
  }
  

  console.log("Original:", message.toString())
  
  const ciphertext = encrypt(publicKey, message)
  console.log("Ciphertext:", ciphertext)

  const decrypted = decrypt(privateKey, publicKey, ciphertext)

  console.log("Decrypted:", decrypted.toString())
}

example()
