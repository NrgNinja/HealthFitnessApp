const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { Int32 } = require('mongodb')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  __v: {
    type: Boolean,
    default: false
  },

  verificationToken: String
})

// static signup method
userSchema.statics.signup = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  // Generate verification token
  const verificationToken = jwt.sign({ email }, process.env.SECRET, { expiresIn: '24h' })

  const user = await this.create({ email, password: hash, verificationToken, __v: false })
  throw Error('Check you email for a verification link!')
  return user
}


// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  if (!user.__v) {
    throw Error('Please verify your email first')
  }

  return user
}

// Verify user's email
userSchema.statics.verifyEmail = async function(verificationToken) {
  const payload = jwt.verify(verificationToken, process.env.SECRET)

  const user = await this.findOneAndUpdate({ email: payload.email, verificationToken }, { $set: { __v: true } }, { new: true })

  if (!user) {
    throw Error('Invalid or expired verification token')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
