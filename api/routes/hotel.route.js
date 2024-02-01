import express from 'express';
import { test } from '../controllers/hotel.controller.js';

// kreiramo rutu express-a:
const router = express.Router();

router.get('/test', test);

export default router;