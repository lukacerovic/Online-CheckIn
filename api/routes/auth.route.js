import express from 'express';
import { signupHotel, signinHotel, signupTourist, signinTourist } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signupHotel", signupHotel);
router.post("/signupTourist", signupTourist);
router.post("/signinHotel", signinHotel);
router.post("/signinTourist", signinTourist);

export default router;