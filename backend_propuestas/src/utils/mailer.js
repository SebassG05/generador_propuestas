// backend_propuestas/src/utils/mailer.js
import nodemailer from 'nodemailer';

console.log('MAIL_USER:', process.env.MAIL_USER);
console.log('MAIL_PASS:', process.env.MAIL_PASS ? '***DEFINIDO***' : 'NO DEFINIDO');

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // tu correo gmail
    pass: process.env.MAIL_PASS  // tu contraseña o app password
  }
});

export const sendMail = async (options) => {
  return transporter.sendMail(options);
};
