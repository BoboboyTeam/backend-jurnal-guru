import CryptoJS from 'crypto-js';
const encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
//U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=

const decrypted = CryptoJS.AES.decrypt(encrypted.toString(), "Secret Passphrase");
//4d657373616765


console.log(encrypted.toString());
console.log(decrypted.toString(CryptoJS.enc.Utf8));