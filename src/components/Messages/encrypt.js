import CryptoJS from 'crypto-js';

const secretKey = 'not-so-secret';

// Helper functions to get rid of / from the URL
const encodeMessageId = (messageId) => {
    return encodeURIComponent(messageId);
};

const decodeMessageId = (encodedMessageId) => {
    return decodeURIComponent(encodedMessageId);
};

// Functions to encrypt and decrypt data
// Messages link won't show the real id or username in the URL

export const encryptData = (username, id) => {
    try {
        const data = `${username}:${id}`;
        const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
        return encodeMessageId(encryptedData);
    } catch (error) {
        console.error('Encryption error:', error);
        return null; // Hope we won't get here
    }
};

export const decryptData = (encryptedData) => {
    try {
        const decodedData = decodeMessageId(encryptedData);
        const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        const [username, id] = decryptedData.split(':'); // Split
        if (!username || !id) {
            throw new Error('Decryption error: Invalid data format');
        }
        return { username, id };
    } catch (error) {
        console.error('Decryption error:', error);
        return { username: null, id: null }; // Hope we do not get here
    }
};
