import * as crypto from 'crypto';
import * as fernet from 'fernet';

export interface v1Interface {
    encryptAES(text: string, key: Buffer): Buffer;
    decryptAES(encodedData: Buffer, key: Buffer): string;
    encryptBase64(text: string, key: string): string;
    decryptBase64(encryptedText: string, key: string): string;
    encryptXOR(text: string, key: number): string;
    decryptXOR(encodedText: string, key: number): string;
}

const v1: v1Interface = {
    encryptAES: (text, key) => {
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

        const ciphertext = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
        const tag = cipher.getAuthTag();

        return Buffer.concat([iv, ciphertext, tag]);
    },
    decryptAES: (encodedData: Buffer, key: Buffer): string => {
        const nonce = encodedData.slice(0, 12); // Nonce length for AES-GCM is typically 12 bytes
        const ciphertext = encodedData.slice(12, -16); // Exclude nonce and tag
        const tag = encodedData.slice(-16); // Last 16 bytes is the authentication tag
    
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce);
        decipher.setAuthTag(tag);
    
        try {
            const decryptedBuffer = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
            return decryptedBuffer.toString('utf-8');
        } catch (error: any) {
            console.error('AES Decryption Error:', error);
            return '';
        }
    },
    encryptBase64: (text, key) => {
        const cipher = new fernet.Secret(key);
        const token = new fernet.Token({ secret: cipher });
        
        const encryptedText = token.encode(text);
        return encryptedText;
    },
    
    decryptBase64: (encryptedText, key) => {
        const cipher = new fernet.Secret(key);
        const token = new fernet.Token({ secret: cipher, token: encryptedText, ttl: 0 });
        
        const decryptedText = token.decode();
        return decryptedText.toString();
    },
    
    encryptXOR: (text, key) => {
        let encodedText = "";
        for (let i = 0; i < text.length; i++) {
            const character = text.charCodeAt(i);
            const encodedCharacter = String.fromCharCode(character ^ key);
            encodedText += encodedCharacter;
        }
        return encodedText;
    },
    
    decryptXOR(encodedText: string, key: number): string {
        return this.encryptXOR(encodedText, key);
    }    
};

export default v1;