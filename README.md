# hikelibs-encrypt

`Hikelibs Encrypt` provides various encryption and decryption functions using different algorithms in Node.js with TypeScript.

## Installation

```bash
npm install hikelibs-encrypt
```

## Usage
```typescript
import { v2 } from "hikelibs-encrypt";

const textToEncrypt = 'Hello, World!';
const keyAES = v2.generateAESKey(256);
const keyXOR = v2.generateXORKey(16);

const encryptedAES = v2('encrypt', 'aes', { string: textToEncrypt, key: keyAES });
const decryptedAES = v2('decrypt', 'aes', { string: encryptedAES, key: keyAES });

const encryptedBase64 = v2('encrypt', 'base64', { string: textToEncrypt });
const decryptedBase64 = v2('decrypt', 'base64', { string: encryptedBase64 });

const encryptedXOR = v2('encrypt', 'xor', { string: textToEncrypt, key: keyXOR });
const decryptedXOR = v2('decrypt', 'xor', { string: encryptedXOR, key: keyXOR });

console.log('Encrypted AES:', encryptedAES);
console.log('Decrypted AES:', decryptedAES);

console.log('Encrypted Base64:', encryptedBase64);
console.log('Decrypted Base64:', decryptedBase64);

console.log('Encrypted XOR:', encryptedXOR);
console.log('Decrypted XOR:', decryptedXOR);
```

# Functions
__`v2(type: 'encrypt' | 'decrypt', method: 'aes' | 'base64' | 'xor', options?: { string: string | Buffer, key?: string | Buffer }): Buffer | string`__
- Encrypts or decrypts based on the specified method.
- __`type`__: 'encrypt' or 'decrypt'.
- __`method`__: 'aes', 'base64' or 'xor'.
- __`options`__: An object containing the properties required for the specified method.

__`v2.generateAESKey(keySize: number): Buffer`__
- Generates a random AES key based on the specified size. 

## GitHub Repository
https://www.github.com/CakeWithPineapple/encrypt