import express from 'express';
import { signupHotel, signinHotel, signupTourist, signinTourist, signoutUser } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signupHotel", signupHotel);
router.post("/signupTourist", signupTourist);
router.post("/signinHotel", signinHotel);
router.post("/signinTourist", signinTourist);
router.get("/signoutUser", signoutUser)

export default router;