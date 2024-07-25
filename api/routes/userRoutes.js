import express from "express";
import { addUser, validateUser } from "../controllers/userControllers.js";

const router = express.Router();

// Route to create a new user
router.post("/new-user", addUser);

// Route to authenticate user login
router.post("/login", validateUser);

export default router;
