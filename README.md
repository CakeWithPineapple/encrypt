# hikelibs-encrypt

`Hikelibs Encrypt` provides various encryption and decryption functions using different algorithms in Node.js with TypeScript.

## Installation

```bash
npm install hikelibs-encrypt
```

## Usage
```typescript
import v1, { v1Interface } from "hikelibs-encrypt";

const keyAES = Buffer.from(v1.encryptXOR('randomKey', 42), 'utf-8');
const keyXOR = 42;

const textToEncrypt = 'Hello, World!';

const encryptedAES = encryptionModule.encryptAES(textToEncrypt, keyAES);
const decryptedAES = encryptionModule.encryptAES(encryptedAES, keyAES);

const encryptedBase64 = encryptionModule.encryptBase64(textToEncrypt);
const decryptedBase64 = encryptionModule.decryptBase64(encryptedBase64);

const encryptedXOR = encryptionModule.encryptXOR(textToEncrypt, keyXOR);
const decryptedXOR = encryptionModule.decryptXOR(encryptedXOR, keyXOR);

console.log('Encrypted AES:', encryptedAES);
console.log('Decrypted AES:', decryptedAES);

console.log('Encrypted Base64:', encryptedBase64);
console.log('Decrypted Base64:', decryptedBase64);

console.log('Encrypted XOR:', encryptedXOR);
console.log('Decrypted XOR:', decryptedXOR);
```

# Functions
__`encryptAES(text: string, key: Buffer): Buffer`__
Encrypts the input text using AES-256-GCM.

__`decryptAES(encodedData: Buffer, key: Buffer): string`__
Decrypts the encoded data using AES-256-GCM.

__`encryptBase64(text: string, key: string): string`__
Encrypts the input text using base64.

__`decryptBase64(encryptedText: string, key: string): string`__
Decrypts the Base64-encoded text using base64.

__`encryptXOR(text: string, key: number: string`__
Encrypts the input text using XOR with the provided key.

__`decryptXOR(encodedText: string, key: number): string`__
Decrypts the XOR-encoded text using the provided key.