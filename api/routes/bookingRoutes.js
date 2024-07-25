import express from "express";

const router = express.Router();

import jwt from "jsonwebtoken";
import {
  getAllBookings,
  getBookings,
  newBooking,
  updateBooking,
} from "../controllers/bookingControllers.js";

const secretKey = process.env.SECRET_KEY;

// Middleware function to authenticate JWT token
function authenticateToken(req, res, next) {
  try {
    // Retrieve token from authorization header
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    
    if (accessToken) {
      // Verify the token using the secret key
      jwt.verify(accessToken, secretKey, (error, userDetails) => {
        if (error) {
          // Token is invalid or expired
          res.status(403).json({
            status: "forbidden",
            message: "Access denied",
          });
        } else {
          // Token is valid, proceed to next middleware or route handler
          next();
        }
      });
    } else {
      // Token is missing
      res.status(401).json({
        status: "failure",
        message: "Access denied",
      });
    }
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      status: "failure",
      error: error,
    });
  }
}

// Route to create a new booking
router.post("/new-booking/:userId", authenticateToken, newBooking);

// Route to get bookings for a specific user
router.get("/get-bookings/:userId", authenticateToken, getBookings);

// Route to get all bookings
router.get("/get-all-bookings", authenticateToken, getAllBookings);

// Route to update a specific booking
router.patch("/update-booking/:id", authenticateToken, updateBooking);

const bookingrouter = router;

export default bookingrouter;
