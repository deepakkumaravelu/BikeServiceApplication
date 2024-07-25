import bcrypt from "bcrypt";
import User from "../models/User.js";
import { saltRounds } from "../utils/constant.js";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

// Generate JWT token
function generateToken(userDetails) {
  return jwt.sign(userDetails, secretKey);
}

// Add a new user
export const addUser = async (req, res) => {
  try {
    // Check if user already exists
    const user = await User.find({ email: req.body.email });
    if (user.length == 0) {
      // Hash the user's password
      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            status: "failure",
            message: "Error in hashing password",
            error: err,
          });
        }

        try {
          // Create a new user record
          const newUser = await User.create({
            email: req.body.email,
            password: hash,
            username: req.body.username,
            isSeller: req.body.isSeller,
            location: req.body.location,
            phone: req.body.phone,
          });

          // Prepare user details for token
          const userDetails = {
            userName: newUser.username,
            emailID: newUser.email,
            isSeller: newUser.isSeller,
            userID: newUser._id.toString(),
          };

          // Generate JWT token
          const accessToken = generateToken(userDetails);

          // Respond with success message and token
          return res.status(201).json({
            status: "success",
            message: "New user created",
            accessToken: accessToken,
            userDetails: userDetails,
          });
        } catch (err) {
          return res.status(500).json({
            status: "failure",
            message: "Cannot create user",
            error: err,
          });
        }
      });
    } else {
      // User already exists
      return res.status(403).json({
        status: "failure",
        message: "User already exists",
      });
    }
  } catch (err) {
    // Handle errors during user check
    return res.status(500).json({
      status: "failure",
      message: "Error finding user",
      error: err,
    });
  }
};

// Validate user credentials
export const validateUser = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        status: "failure",
        message: "User does not exist",
      });
    }

    // Compare provided password with stored hash
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "error",
          message: "Authentication failed",
          error: err,
        });
      }
      if (!result) {
        return res.status(401).json({
          status: "failure",
          message: "Invalid password",
        });
      }

      // Prepare user details for token
      const userDetails = {
        userName: user.username,
        emailID: user.email,
        isSeller: user.isSeller,
        userID: user._id.toString(),
      };

      // Generate JWT token
      const accessToken = generateToken(userDetails);

      // Respond with success message and token
      return res.status(200).json({
        status: "success",
        message: "User valid",
        accessToken: accessToken,
        userDetails: userDetails,
      });
    });
  } catch (error) {
    // Handle errors during authentication
    return res.status(500).json({
      status: "error",
      message: "Authentication failed",
      error: error,
    });
  }
};
