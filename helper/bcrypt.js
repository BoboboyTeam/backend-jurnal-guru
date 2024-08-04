const CryptoJS = require("crypto-js");

const hashPassword = (password) => {
  console.log(password, process.env.SECRET_KEY);
  console.log( CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString())
  return CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
};

const decryptPassword = (password) => {
  console.log(password, process.env.SECRET_KEY);
  let bytes = CryptoJS.AES.decrypt(password, process.env.SECRET_KEY);
  console.log(bytes.toString(CryptoJS.enc.Utf8));
  return bytes.toString(CryptoJS.enc.Utf8);
};

const comparePassword = (password, password_db) => {
  let bytes = CryptoJS.AES.decrypt(password_db, process.env.SECRET_KEY);
  if (bytes.toString(CryptoJS.enc.Utf8) === password) {
    return true;
  } else {
    return false;
  }
};

module.exports = { hashPassword, decryptPassword, comparePassword };
