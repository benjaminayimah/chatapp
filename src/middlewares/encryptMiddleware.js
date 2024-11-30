
import CryptoJS from "crypto-js";

const secretKey = process.env.VUE_APP_SECRET

export function encryptToken(token) {
    return CryptoJS.AES.encrypt(token, secretKey).toString();
}

export function decryptToken(encryptedToken) {
    if (!encryptedToken) return null;
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey)
        return bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
        console.error('Error decrypting token:', error);
        return null;
    }
}