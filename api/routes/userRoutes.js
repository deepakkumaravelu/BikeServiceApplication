import express from 'express';
import { addUser, validateUser } from '../controllers/userControllers.js';


const router=express.Router();

router.post("/new-user",addUser );
router.post("/login",validateUser );

export default router;