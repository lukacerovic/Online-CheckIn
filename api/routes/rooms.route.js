import express from 'express';
import { createRoom, getUserListing, getAllListings, getRoomDetails } from '../controllers/rooms.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


// kreiramo rutu express-a:
const router = express.Router();

router.post("/create", verifyToken, createRoom);
router.get('/listings/:id', verifyToken, getUserListing);
router.get('/roomDetails/:id', verifyToken, getRoomDetails);
router.get('/allListings', getAllListings);


export default router;