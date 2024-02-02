import express from 'express';
import { updateTourist, deleteTourist } from '../controllers/tourist.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// kreiramo rutu express-a:
const router = express.Router();

router.post('/updateTourist/:id', verifyToken, updateTourist);
router.delete('/deleteTourist/:id', verifyToken, deleteTourist);
export default router;