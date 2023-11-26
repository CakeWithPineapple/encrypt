import * as crypto from 'crypto';
import v1, { v1Interface } from '../src';

describe('Encryption Module Tests', () => {
  // Generate a random key for AES encryption
  const keyAES = crypto.randomBytes(32);

  // Convert the key to URL-safe base64 for Fernet encryption
  const keyFernet = crypto.randomBytes(32).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  const keyXOR = 42;

  const textToEncrypt = 'Hello, World!';

  // AES Encryption and Decryption
  test('AES Encryption and Decryption', () => {
    const encryptedAES = v1.encryptAES(textToEncrypt, keyAES);
    const decryptedAES = v1.decryptAES(encryptedAES, keyAES);
    expect(decryptedAES).toBe(textToEncrypt);
  });

  // Fernet Base64 Encryption and Decryption
  test('Fernet Base64 Encryption and Decryption', () => {
    const encryptedFernet = v1.encryptBase64(textToEncrypt, keyFernet);
    const decryptedFernet = v1.decryptBase64(encryptedFernet, keyFernet);
    expect(decryptedFernet).toBe(textToEncrypt);
  });

  // XOR Encryption and Decryption
  test('XOR Encryption and Decryption', () => {
    const encryptedXOR = v1.encryptXOR(textToEncrypt, keyXOR);
    const decryptedXOR = v1.decryptXOR(encryptedXOR, keyXOR);
    expect(decryptedXOR).toBe(textToEncrypt);
  });
});