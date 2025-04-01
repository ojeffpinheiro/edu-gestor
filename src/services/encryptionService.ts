/**
 * Encryption service for handling secure data in the classroom system
 * Provides methods to encrypt and decrypt sensitive information
 */
import CryptoJS from 'crypto-js';

// Secret key for encryption/decryption - in production, this would be stored in environment variables
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || 'classroom-system-secret-key';

/**
 * Encrypts a string using AES encryption
 * @param data The plain text data to encrypt
 * @returns The encrypted data as a string
 */
export const encryptData = async (data: string): Promise<string> => {
  try {
    if (!data) {
      throw new Error('No data provided for encryption');
    }
    
    const encryptedData = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    return encryptedData;
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypts an encrypted string
 * @param encryptedData The encrypted data to decrypt
 * @returns The decrypted data as a string
 */
export const decryptData = async (encryptedData: string): Promise<string> => {
  try {
    if (!encryptedData) {
      throw new Error('No encrypted data provided for decryption');
    }
    
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedData) {
      throw new Error('Failed to decrypt data or decrypted data is empty');
    }
    
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Verifies if a plain text value matches an encrypted value
 * @param plainText The plain text to verify
 * @param encryptedValue The encrypted value to compare against
 * @returns True if the plainText matches the encrypted value, false otherwise
 */
export const verifyEncryptedValue = async (plainText: string, encryptedValue: string): Promise<boolean> => {
  try {
    if (!plainText || !encryptedValue) {
      return false;
    }
    
    const decrypted = await decryptData(encryptedValue);
    return decrypted === plainText;
  } catch (error) {
    console.error('Error verifying encrypted value:', error);
    return false;
  }
};

/**
 * Generates a random secure token (can be used for additional security measures)
 * @param length The length of the token to generate (default: 32)
 * @returns A random secure token
 */
export const generateSecureToken = (length: number = 32): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  
  // Create an array of random values
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  
  // Use the random values to select characters
  for (let i = 0; i < length; i++) {
    token += characters.charAt(randomValues[i] % characters.length);
  }
  
  return token;
};

/**
 * Hashes data using SHA-256 (for non-reversible encryption needs)
 * @param data The data to hash
 * @returns The hashed data
 */
export const hashData = (data: string): string => {
  if (!data) {
    throw new Error('No data provided for hashing');
  }
  
  return CryptoJS.SHA256(data).toString();
};