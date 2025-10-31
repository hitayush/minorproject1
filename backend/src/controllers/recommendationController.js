import Recommendation from '../models/Recommendation.js';

// @desc    Get user recommendations
// @route   GET /api/recommendations
// @access  Private
export const getRecommendations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Get active recommendations
    const recommendations = await Recommendation.getActiveRecommendations(userId);

    if (!recommendations) {
      return res.status(404).json({
        success: false,
        message: 'No active recommendations found. Generate new recommendations first.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        recommendations: recommendations.recommendations,
        algorithm: recommendations.algorithm,
        generatedAt: recommendations.generatedAt,
        expiresAt: recommendations.expiresAt,
        version: recommendations.version
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate new recommendations
// @route   POST /api/recommendations/generate
// @access  Private
export const generateRecommendations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = req.user;

    // Deactivate existing recommendations
    await Recommendation.updateMany(
      { userId, isActive: true },
      { isActive: false }
    );

    // Generate new recommendations based on user profile
    const recommendations = generateRuleBasedRecommendations(user);

    // Create new recommendation document
    const newRecommendations = await Recommendation.create({
      userId,
      recommendations,
      algorithm: 'rule-based',
      version: '1.0'
    });

    res.status(201).json({
      success: true,
      message: 'Recommendations generated successfully',
      data: {
        recommendations: newRecommendations.recommendations,
        algorithm: newRecommendations.algorithm,
        generatedAt: newRecommendations.generatedAt,
        expiresAt: newRecommendations.expiresAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recommendation feedback
// @route   PUT /api/recommendations/feedback/:recommendationId
// @access  Private
export const updateRecommendationFeedback = async (req, res, next) => {
  try {
    const { recommendationId } = req.params;
    const { helpful, comments } = req.body;
    const userId = req.user.id;

    const recommendation = await Recommendation.findOne({
      _id: recommendationId,
      userId
    });

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found'
      });
    }

    await recommendation.addFeedback(helpful, comments);

    res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to generate rule-based recommendations
const generateRuleBasedRecommendations = (user) => {
  const recommendations = [];
  
  // Education-based recommendations
  if (user.education?.level === '10th') {
    recommendations.push({
      title: 'Choose Your Stream Wisely',
      description: 'After 10th grade, selecting the right stream (Science, Commerce, Arts) is crucial for your career path. Consider your interests and aptitude.',
      category: 'education',
      priority: 'high',
      actionItems: [
        {
          task: 'Take career aptitude tests online',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week
        },
        {
          task: 'Research different streams and career options',
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks
        },
        {
          task: 'Speak with career counselors or teachers',
          deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 3 weeks
        }
      ],
      resources: [
        {
          title: 'Stream Selection Guide',
          url: 'https://example.com/stream-guide',
          type: 'article'
        }
      ],
      estimatedTime: '2-3 weeks',
      difficulty: 'beginner',
      tags: ['stream-selection', 'career-planning', 'education']
    });
  }

  if (user.education?.level === '12th') {
    recommendations.push({
      title: 'Prepare for Higher Education',
      description: 'Focus on entrance exams, college applications, and skill development for your chosen field.',
      category: 'education',
      priority: 'high',
      actionItems: [
        {
          task: 'Identify relevant entrance exams',
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        },
        {
          task: 'Create a study schedule for exams',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      ],
      resources: [
        {
          title: 'Entrance Exam Preparation',
          url: 'https://example.com/exam-prep',
          type: 'course'
        }
      ],
      estimatedTime: '6-12 months',
      difficulty: 'intermediate',
      tags: ['entrance-exams', 'college-prep', 'study-planning']
    });
  }

  // Skills-based recommendations
  if (user.skills && user.skills.length > 0) {
    recommendations.push({
      title: 'Enhance Your Technical Skills',
      description: 'Build upon your existing skills and learn new technologies relevant to your field.',
      category: 'skill-development',
      priority: 'medium',
      actionItems: [
        {
          task: 'Create a portfolio showcasing your skills',
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        {
          task: 'Take online courses in your skill areas',
          deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
        }
      ],
      resources: [
        {
          title: 'Online Learning Platforms',
          url: 'https://example.com/online-courses',
          type: 'website'
        }
      ],
      estimatedTime: '2-3 months',
      difficulty: 'intermediate',
      tags: ['skill-development', 'portfolio', 'online-learning']
    });
  }

  // Interest-based recommendations
  if (user.interests && user.interests.length > 0) {
    recommendations.push({
      title: 'Explore Career Paths in Your Interests',
      description: 'Research and explore career opportunities that align with your interests.',
      category: 'career-path',
      priority: 'medium',
      actionItems: [
        {
          task: 'Research job roles in your interest areas',
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        },
        {
          task: 'Connect with professionals in those fields',
          deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
        }
      ],
      resources: [
        {
          title: 'Career Exploration Tools',
          url: 'https://example.com/career-tools',
          type: 'website'
        }
      ],
      estimatedTime: '1-2 months',
      difficulty: 'beginner',
      tags: ['career-exploration', 'networking', 'research']
    });
  }

  // General recommendations
  recommendations.push({
    title: 'Build Your Professional Network',
    description: 'Networking is crucial for career growth. Start building connections in your field.',
    category: 'networking',
    priority: 'medium',
    actionItems: [
      {
        task: 'Create a LinkedIn profile',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        task: 'Join professional groups and communities',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      }
    ],
    resources: [
      {
        title: 'LinkedIn Networking Guide',
        url: 'https://example.com/linkedin-guide',
        type: 'article'
      }
    ],
    estimatedTime: 'Ongoing',
    difficulty: 'beginner',
    tags: ['networking', 'linkedin', 'professional-development']
  });

  return recommendations;
};














