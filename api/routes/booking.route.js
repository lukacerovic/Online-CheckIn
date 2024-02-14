import express from 'express';
import { createBooking, getBookingsInfo, assignRoom, yourRoomDetails } from '../controllers/booking.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// kreiramo rutu express-a:
const router = express.Router();

router.post('/createBooking', verifyToken, createBooking);
router.get('/bookingsInfo/:id', verifyToken, getBookingsInfo);
router.post('/assignRoom/:id/:roomId', verifyToken, assignRoom);
router.post('/your-room/:roomId/:roomNo', yourRoomDetails);

export default router;