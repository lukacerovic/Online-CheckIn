import express from 'express';
import { signupHotel, signinHotel } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signupHotel", signupHotel);
// router.post("/signupTourist", signupTourist);
router.post("/signinHotel", signinHotel);


export default router;