import * as crypto from 'crypto';

interface EncryptionOptions {
  string: string | Buffer;
  key?: Buffer | number;
}

const error = (code: string, location: string, reason: string) => {
  return `Exited with code ${code} due to ${reason} at ${location}.`;
}

v2.generateAESKey = (keySize: number): Buffer => {
  return crypto.randomBytes(keySize / 8);
}

v2.generateXORKey = (keySize: number): number => {
  const keyLength: number = keySize;  // Choose the desired key length in bytes
  const hexChars: string = '0123456789ABCDEF';

  const keyArray: Buffer = crypto.randomBytes(keyLength);

  let hexString: string = '';
  for (const byte of keyArray) {
      hexString += hexChars[byte >> 4] + hexChars[byte & 0xF];
  }

  const numericKey: number | undefined = parseInt(hexString, 16);
  return numericKey;
}

type Method = 'aes' | 'base64' | 'xor';
  
export function v2(type: 'encrypt' | 'decrypt', method: Method, options: EncryptionOptions): Buffer | string {
  const location = `${method.toUpperCase()}_${type.toUpperCase()}`;
  

  if (method === 'aes' && type === 'encrypt') {
    if (!(options.key instanceof Buffer) || typeof options.string !== "string") {
      throw new Error(`${error("40T", location, "invalid type")}`);
    } else {
      return encryptAES(options.string, options.key);
    }
  }
  if (method === 'base64' && type === 'encrypt') {
    if (typeof options.string !== "string") {
      throw new Error(`${error("40T", location, "invalid type")}`);
    } else if (options.key) {
      throw new Error(`${error("40N", location, "non-existent prop \"options.key\"")}`)
    } else {
      return encryptBase64(options.string);
    }
  }
  if (method === 'xor' && type === 'encrypt') {
    if (typeof options.string !== "string" || typeof options.key !== "number") {
      throw new Error(`${error("40T", location, "invalid type")}`);
    } else {
      return encryptXOR(options.string, options.key);
    }
  }
  if (method === 'aes' && type === 'decrypt') {
    if (!(options.key instanceof Buffer) || !(options.string instanceof Buffer)) {
      throw new Error(`${error("40T", location, "invalid type")}`);
    } else {
      return decryptAES(options.string, options.key);
    }
  }
  if (method === 'base64' && type === 'decrypt') {
    if (typeof options.string !== "string") {
      throw new Error(`${error("40T", location, "invalid type")}`);
    } else if (options.key) {
      throw new Error(`${error("40N", location, "non-existent prop \"options.key\"")}`)
    } else {
      return decryptBase64(options.string);
    }
  }
  if (method === 'xor' && type === 'decrypt') {
    if (typeof options.string !== "string" || typeof options.key !== "number") {
      throw new Error(`${error("40T", location, "invalid type")}`);
    } else {
      return v2("encrypt", 'xor', {
        string: options.string,
        key: options.key,
      });
    }
  }

  return `${error("40U", "v2", "that no type or method was specified")}`;
}

function encryptAES(text: string, key: Buffer) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  const ciphertext = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, ciphertext, tag]);
}

function encryptBase64(text: string) {
  return btoa(text);
}

function encryptXOR(text: string, key: number) {
  let encodedText = "";
  for (let i = 0; i < text.length; i++) {
      const character = text.charCodeAt(i);
      const encodedCharacter = String.fromCharCode(character ^ key);
      encodedText += encodedCharacter;
  }
  return encodedText;
}

function decryptAES(data: Buffer, key: Buffer): string {
  const nonce = data.slice(0, 12); // Nonce length for AES-GCM is typically 12 bytes
  const ciphertext = data.slice(12, -16); // Exclude nonce and tag
  const tag = data.slice(-16); // Last 16 bytes is the authentication tag

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce);
  decipher.setAuthTag(tag);

  try {
    const decryptedBuffer = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return decryptedBuffer.toString('utf-8');
  } catch (error: any) {
    console.error('AES Decryption Error:', error);
    return '';
  }
}

function decryptBase64(text: string) {
  return atob(text);
}