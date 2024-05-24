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
    const data = `${username}:${id}`;
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encodeMessageId(encryptedData);
};

export const decryptData = (encryptedData) => {
    const decode = decodeMessageId(encryptedData);
    const bytes = CryptoJS.AES.decrypt(decode, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    const [username, id] = decryptedData.split(':'); // Split
    return { username, id };
};