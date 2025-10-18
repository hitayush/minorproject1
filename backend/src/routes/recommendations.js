import express from 'express';
import { getRecommendations, generateRecommendations, updateRecommendationFeedback } from '../controllers/recommendationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected recommendation routes
router.get('/', protect, getRecommendations);
router.post('/generate', protect, generateRecommendations);
router.put('/feedback/:recommendationId', protect, updateRecommendationFeedback);

export default router;













