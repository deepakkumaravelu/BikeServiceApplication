import express from 'express';

const router = express.Router();

import jwt from "jsonwebtoken";
import { getAllBookings, getBookings, newBooking, updateBooking } from '../controllers/bookingControllers.js';

const secretKey =process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (accessToken) {
      jwt.verify(accessToken, secretKey, (error, userDetails) => {
        if (error) {
          res.status(403).json({
            status: "forbidden",
            message: "access denied",
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        status: "failure",
        message: "access denied",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      error: error,
    });
  }
}

// function authenticateToken(req,res,next){
//   next()
// }

router.post("/new-booking/:userId", authenticateToken, newBooking);

router.get("/get-bookings/:userId", authenticateToken, getBookings);

router.get("/get-all-bookings", authenticateToken, getAllBookings);

router.patch("/update-booking/:id", authenticateToken, updateBooking);

const bookingrouter=router;

export default bookingrouter