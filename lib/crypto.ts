// import crypto from 'crypto';

// const ENCRYPTION_KEY : string = process.env.ENCRYPT_KEY as s;
// const IV_LENGTH = 16 ;

// function encrypt(text : string) {
//     const iv = crypto.randomBytes(IV_LENGTH)
//     const cipher = crypto.createCipheriv(
//       'aes-256-cbc',
//       Buffer.from(ENCRYPTION_KEY),
//       iv,
//     )
//     const encrypted = cipher.update(text)

//     return (
//       iv.toString('base64') +
//       ':' +
//       Buffer.concat([encrypted, cipher.final()]).toString('base64')

//     )
//   }


//   function decrypt(text : string) {
//     const textParts  = text.split(':')
//     const iv = Buffer.from( textParts.shift(), 'base64')
//     const encryptedText = Buffer.from(textParts.join(':'), 'base64')
//     const decipher = crypto.createDecipheriv(
//       'aes-256-cbc',
//       Buffer.from(ENCRYPTION_KEY),
//       iv,
//     )
//     const decrypted = decipher.update(encryptedText)

//     return Buffer.concat([decrypted, decipher.final()]).toString()
// }

// export {
//     encrypt,
//     decrypt
// }
