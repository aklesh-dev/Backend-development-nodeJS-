const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      else if (checkExistingUser.email) {
        message += 'email'
      }
      else if (checkExistingUser.email && checkExistingUser.username) {
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
    // Extract user credential from request body
    const { username, password } = req.body;

    // Check user exists in the database
    const validUser = await User.findOne({ username });
    if (!validUser) return res.status(404).json({ success: false, message: 'User not found' });

    // Check and compare the password
    const isPasswordMatch = bcrypt.compareSync(password, validUser.password);
    if (!isPasswordMatch) return res.status(403).json({ success: false, message: "Invalid credentials" });

    // Create user token
    const accessToken = jwt.sign({
      userId: validUser._id,
      username: validUser.username,
      role: validUser.role,
    }, process.env.JWT_SECRET, { expiresIn: '15m' });

    return res.status(200).json({
      success: true,
      message: "User logged successfully",
      accessToken,
    });

  } catch (error) {
    console.error('Error logging user:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

const changePassword = async (req, res) => {
  try {
    // Current userId
    const userId = req.userInfo.userId;

    // Extract old and new password
    const {oldPassword, newPassword} = req.body;

    // Find the current user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!"
      });
    }

    // Check if the old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is not correct! Please try again"
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const newHashPassword = bcrypt.hashSync(newPassword, salt);

    // Update the password
    user.password = newHashPassword;
    user.save();
    res.status(200).json({
      success:true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
}

module.exports = { registerUser, loginUser, changePassword };