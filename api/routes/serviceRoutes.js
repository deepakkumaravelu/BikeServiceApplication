import express from "express";

const router = express.Router();
import {
  addService,
  getService,
  updateService,
  deleteService,
  getAllService,
} from "../controllers/serviceControllers.js";

import jwt from "jsonwebtoken";

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

// Route to add a new service
router.post("/add-service/:userId", authenticateToken, addService);

// Route to get services for a specific user
router.get("/get-service/:userId", authenticateToken, getService);

// Route to get all services
router.get("/get-all-service", authenticateToken, getAllService);

// Route to delete a specific service
router.delete("/delete-service/:id", authenticateToken, deleteService);

// Route to update a specific service
router.patch("/update-service/:id", authenticateToken, updateService);

const servicerouter = router;

export default servicerouter;
