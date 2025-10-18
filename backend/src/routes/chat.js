import express from 'express';
import { sendMessage, getChatHistory, getSessionChats, getSuggestedQuestions } from '../controllers/chatController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Chat routes (optional auth for anonymous users)
router.post('/message', optionalAuth, sendMessage);
router.get('/history/:sessionId', optionalAuth, getSessionChats);
router.get('/history', optionalAuth, getChatHistory);
router.get('/suggestions', getSuggestedQuestions);

export default router;




