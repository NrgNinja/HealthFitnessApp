const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { sendVerificationEmail } = require('../emailUtils');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create the new user
    const user = await User.create({ email, password });

    // Generate a verification link and send it to the user's email
    const verificationToken = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
    const verificationLink = `${process.env.BASE_URL}/verify/${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { signupUser, loginUser }
