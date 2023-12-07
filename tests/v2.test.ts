import { v2 } from "../src";

describe('Encryption Module Tests', () => {
  // Generate a random key for AES encryption
  const keyAES = v2.generateAESKey(256);

  const keyXOR = v2.generateXORKey(16);

  const textToEncrypt = 'Hello, World!';

  // AES Encryption and Decryption
  test('AES Encryption and Decryption', () => {
    const encryptedAES = v2('encrypt', 'aes', { string: textToEncrypt, key: keyAES });
    const decryptedAES = v2('decrypt', 'aes', { string: encryptedAES, key: keyAES });
    expect(decryptedAES).toBe(textToEncrypt);
  });

  // Base64 Encryption and Decryption
  test('Base64 Encryption and Decryption', () => {
    const encryptedBase64 = v2('encrypt', 'base64', { string: textToEncrypt });
    const decryptedBase64 = v2('decrypt', 'base64', { string: encryptedBase64 });
    expect(decryptedBase64).toBe(textToEncrypt);
  });

  // XOR Encryption and Decryption
  test('XOR Encryption and Decryption', () => {
    const encryptedXOR = v2('encrypt', 'xor', { string: textToEncrypt, key: keyXOR });
    const decryptedXOR = v2('decrypt', 'xor', { string: encryptedXOR, key: keyXOR });
    expect(decryptedXOR).toBe(textToEncrypt);
  });
});