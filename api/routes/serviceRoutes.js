import express from 'express';

const router = express.Router();
import { addService,getService,updateService,deleteService, getAllService } from '../controllers/serviceControllers.js';

import jwt from "jsonwebtoken";

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


router.post("/add-service/:userId", authenticateToken, addService);

router.get("/get-service/:userId", authenticateToken, getService);

router.get("/get-all-service", authenticateToken, getAllService);

router.delete("/delete-service/:id", authenticateToken, deleteService);

router.patch("/update-service/:id", authenticateToken, updateService);

const servicerouter=router;

export default servicerouter