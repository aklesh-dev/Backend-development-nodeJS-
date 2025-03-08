const User = require('../models/user.model');
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    // extract user information from our request body
    const { username, email, password, role } = req.body;

    // check if user is already existing in our database
    const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (checkExistingUser) {
      let message = 'User already exists with the same ';
      if (checkExistingUser.username) {
        message += 'username';
      }
      else if(checkExistingUser.email){
        message += 'email'
      }
      else if(checkExistingUser.email && checkExistingUser.username) {
        message += 'username and email';
      }
      return res.status(400).json({
        success: false,
        message: message,
      });
    }

    // Hash the user password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user and save in the database.
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    await newlyCreatedUser.save();

    if (newlyCreatedUser) {
      return res.status(201).json({ success: true, message: "User register successfully" });
    } else {
      res.status(400).json({ success: false, message: 'Unable to register user! Please try again' })
    }

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};


const loginUser = async (req, res) => {
  try {

  } catch (error) {
    console.error('Error logging user:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

module.exports = { registerUser, loginUser };