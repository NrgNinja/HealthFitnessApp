const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: 'username',
    pass: 'password',
  },
})

const sendVerificationEmail = async (req, res) => {
  const { email } = req.body

  const verificationToken = jwt.sign({ email }, 'mysecretkey')

  const mailOptions = {
    from: 'noreply@example.com',
    to: email,
    subject: 'Verify your email address',
    html: `<p>Hi,</p><p>Please click <a href="https://example.com/verify-email/${verificationToken}">here</a> to verify your email address.</p>`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Verification email sent' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error sending verification email' })
  }
}

module.exports = { sendVerificationEmail }

