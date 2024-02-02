import express from 'express';
import { createRoom } from '../controllers/rooms.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


// kreiramo rutu express-a:
const router = express.Router();

router.post("/create", verifyToken, createRoom);


export default router;