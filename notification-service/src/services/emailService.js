const nodemailer = require('nodemailer');
require('dotenv').config(); // Explicitly load .env

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: { rejectUnauthorized: false }
});

const sendEmail = async (to, subject, html) => {
  try {

    const info = await transporter.sendMail({
      from: `"Cloud Kitchen" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    return { success: true };
  } catch (error) {
    console.error('SMTP Error Details:', {
      code: error.code,
      response: error.response
    });
    throw error;
  }
};

module.exports = { sendEmail };