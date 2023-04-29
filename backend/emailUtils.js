const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');

//const API_KEY = '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';
// Load environment variables from file
dotenv.config({ path: 'sendgrid.env' });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (recipientEmail, verificationLink) => {
  const message = {
    to: recipientEmail,
    from: 'tristanhedrick.whs@gmail.com',
    subject: 'Please verify your email',
    html: `Please click this link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
  };
  try {
    await sgMail.send(message);
    console.log(`Verification email sent to ${recipientEmail}`);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw new Error(`Failed to send verification email to ${recipientEmail}`);
  }
};

module.exports = { sendVerificationEmail };
