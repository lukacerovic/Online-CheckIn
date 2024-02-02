import express from 'express';
import { test, updateHotel, deleteHotel } from '../controllers/hotel.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// kreiramo rutu express-a:
const router = express.Router();

router.get('/test', test);
router.post('/updateHotel/:id', verifyToken, updateHotel);
router.delete('/deleteHotel/:id', verifyToken, deleteHotel);
export default router;