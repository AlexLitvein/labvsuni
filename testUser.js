const dataColl = new (require('./comjs/ISensDataDB_v1.0'))();
const CryptoJS = require('crypto-js');

function UserChat (login, passw) {
    this.login = login;
    this.passw = passw;
    this.lastPost = null;
}

// Encrypt
const ciphertext = CryptoJS.AES.encrypt('Message', 'Secret Passphrase');
console.log(ciphertext.toString());
console.log(ciphertext.iv.toString());

// Decrypt
const bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'Secret Passphrase');
const originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log(originalText); // 'my message'

// const ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// // Decrypt
// const bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// const originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText); // 'my message'

// const u1 = new UserChat('Vasa', 'passVasa');
// dataColl.AddAnyOneData('chatDb', 'userColl', u1);
