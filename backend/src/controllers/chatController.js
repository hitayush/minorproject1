import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Chat from '../models/Chat.js';
import { getCareerResponse, getFollowUpQuestions } from '../utils/careerResponses.js';

// @desc    Send message to chatbot
// @route   POST /api/chat/message
// @access  Public (with optional auth)
export const sendMessage = async (req, res, next) => {
  try {
    const { message, sessionId } = req.body;
    const userId = req.user?.id;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Generate session ID if not provided
    const currentSessionId = sessionId || uuidv4();

    // Find or create chat session
    let chatSession = await Chat.findOne({ sessionId: currentSessionId });
    
    if (!chatSession) {
      chatSession = await Chat.create({
        sessionId: currentSessionId,
        userId: userId || null,
        isAnonymous: !userId,
        messages: []
      });
    }

    // Add user message to chat
    await chatSession.addMessage('user', message.trim());

    try {
      // Get career guidance response based on user message
      const botResponse = getCareerResponse(message.trim());
      
      // Determine the category for follow-up questions
      let category = 'general';
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('10th') || lowerMessage.includes('tenth')) {
        category = 'after10th';
      } else if (lowerMessage.includes('engineering') || lowerMessage.includes('engineer')) {
        category = 'engineering';
      } else if (lowerMessage.includes('medical') || lowerMessage.includes('doctor') || lowerMessage.includes('mbbs')) {
        category = 'medical';
      } else if (lowerMessage.includes('commerce') || lowerMessage.includes('business') || lowerMessage.includes('ca') || lowerMessage.includes('mba')) {
        category = 'commerce';
      } else if (lowerMessage.includes('arts') || lowerMessage.includes('humanities') || lowerMessage.includes('psychology') || lowerMessage.includes('law')) {
        category = 'arts';
      } else if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('develop')) {
        category = 'skills';
      }
      
      // Get follow-up questions for the category
      const followUpQuestions = getFollowUpQuestions(category);
      
      // Add bot response to chat
      await chatSession.addMessage('assistant', botResponse, {
        model: 'careerly-ai-career-guidance',
        responseTime: Date.now(),
        category: category
      });

      res.status(200).json({
        success: true,
        data: {
          message: botResponse,
          sessionId: currentSessionId,
          timestamp: new Date().toISOString(),
          followUpQuestions: followUpQuestions.slice(0, 3), // Send first 3 follow-up questions
          category: category
        }
      });

    } catch (error) {
      console.error('Career Guidance Error:', error.message);
      
      // Fallback response if career guidance system fails
      const fallbackResponse = `Hello! I'm Careerly AI, your career guidance assistant. I'm here to help you with:

🎯 **Career Planning** - Choose the right career path
📚 **Education Guidance** - Select the best courses and streams  
💼 **Skill Development** - Learn in-demand skills
🚀 **Job Search Tips** - Find your dream job
📈 **Career Growth** - Advance in your chosen field

What would you like to know about? You can ask me about:
• Career options after 10th/12th
• Engineering, Medical, Commerce, Arts streams
• Skill development and learning paths
• Job opportunities and salary prospects
• Career planning and goal setting

How can I help you today?`;
      
      await chatSession.addMessage('assistant', fallbackResponse, {
        model: 'careerly-ai-fallback',
        responseTime: Date.now()
      });

      res.status(200).json({
        success: true,
        data: {
          message: fallbackResponse,
          sessionId: currentSessionId,
          timestamp: new Date().toISOString(),
          followUpQuestions: [
            "What career options are available after 10th grade?",
            "How to choose between science, commerce, and arts?",
            "What skills should I develop for my career?"
          ]
        }
      });
    }

  } catch (error) {
    next(error);
  }
};

// @desc    Get chat history for a specific session
// @route   GET /api/chat/history/:sessionId
// @access  Public (with optional auth)
export const getSessionChats = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user?.id;

    const chatSession = await Chat.findOne({ 
      sessionId,
      ...(userId ? { $or: [{ userId }, { isAnonymous: true }] } : { isAnonymous: true })
    });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        sessionId: chatSession.sessionId,
        messages: chatSession.messages,
        messageCount: chatSession.messageCount,
        createdAt: chatSession.createdAt,
        updatedAt: chatSession.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's chat history (only for authenticated users)
// @route   GET /api/chat/history
// @access  Private
export const getChatHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 10 } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const chats = await Chat.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('sessionId messages topic summary createdAt updatedAt messageCount');

    const total = await Chat.countDocuments({ userId });

    res.status(200).json({
      success: true,
      data: {
        chats,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get suggested questions for career guidance
// @route   GET /api/chat/suggestions
// @access  Public
export const getSuggestedQuestions = async (req, res, next) => {
  try {
    const { category = 'general' } = req.query;
    
    const followUpQuestions = getFollowUpQuestions(category);
    
    // Get popular questions for each category
    const popularQuestions = {
      general: [
        "What career options are available after 10th grade?",
        "How to choose between science, commerce, and arts?",
        "What skills should I develop for my career?",
        "How to plan my career path?",
        "What are the emerging career fields?"
      ],
      after10th: [
        "Which stream should I choose after 10th?",
        "What are the career options in science stream?",
        "What are the career options in commerce stream?",
        "What are the career options in arts stream?",
        "How to decide between PCM and PCB?"
      ],
      engineering: [
        "Which engineering branch has the best job opportunities?",
        "What are the career options after engineering?",
        "Should I do higher studies after engineering?",
        "How to prepare for engineering entrance exams?",
        "What is the salary range for engineers?"
      ],
      medical: [
        "How to prepare for NEET exam?",
        "What are the career options after MBBS?",
        "What are alternative careers in healthcare?",
        "How long does it take to become a doctor?",
        "What are the challenges in medical field?"
      ],
      commerce: [
        "Which professional course should I choose - CA, CS, or CFA?",
        "What are the career options after B.Com?",
        "How to prepare for CA exams?",
        "What is the difference between CA and CS?",
        "Is MBA a good option after commerce?"
      ],
      arts: [
        "What are government job options after arts?",
        "How to prepare for civil services?",
        "What are career options in psychology?",
        "Is law a good career choice?",
        "What are career options in journalism?"
      ]
    };

    res.status(200).json({
      success: true,
      data: {
        category,
        suggestedQuestions: popularQuestions[category] || popularQuestions.general,
        followUpQuestions: followUpQuestions,
        categories: Object.keys(popularQuestions)
      }
    });
  } catch (error) {
    next(error);
  }
};




