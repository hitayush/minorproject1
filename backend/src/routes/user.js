import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected user routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;














