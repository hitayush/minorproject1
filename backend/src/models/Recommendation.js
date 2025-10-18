import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  recommendations: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['career-path', 'skill-development', 'education', 'job-search', 'networking'],
      required: true
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    actionItems: [{
      task: {
        type: String,
        required: true,
        trim: true
      },
      deadline: Date,
      completed: {
        type: Boolean,
        default: false
      },
      completedAt: Date
    }],
    resources: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['article', 'course', 'book', 'video', 'tool', 'website']
      }
    }],
    estimatedTime: {
      type: String,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    tags: [{
      type: String,
      trim: true
    }]
  }],
  algorithm: {
    type: String,
    enum: ['rule-based', 'ai-powered', 'hybrid'],
    default: 'rule-based'
  },
  version: {
    type: String,
    default: '1.0'
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: function() {
      // Recommendations expire after 30 days
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
  },
  feedback: {
    helpful: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: {
      type: String,
      trim: true
    },
    submittedAt: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
recommendationSchema.index({ userId: 1, isActive: 1 });
recommendationSchema.index({ generatedAt: -1 });
recommendationSchema.index({ expiresAt: 1 });

// Virtual for recommendation count
recommendationSchema.virtual('recommendationCount').get(function() {
  return this.recommendations.length;
});

// Method to mark action item as completed
recommendationSchema.methods.completeActionItem = function(recommendationIndex, actionItemIndex) {
  const recommendation = this.recommendations[recommendationIndex];
  if (recommendation && recommendation.actionItems[actionItemIndex]) {
    recommendation.actionItems[actionItemIndex].completed = true;
    recommendation.actionItems[actionItemIndex].completedAt = new Date();
    return this.save();
  }
  throw new Error('Recommendation or action item not found');
};

// Method to add feedback
recommendationSchema.methods.addFeedback = function(helpful, comments = '') {
  this.feedback = {
    helpful,
    comments,
    submittedAt: new Date()
  };
  return this.save();
};

// Static method to get active recommendations for user
recommendationSchema.statics.getActiveRecommendations = function(userId) {
  return this.findOne({ 
    userId, 
    isActive: true,
    expiresAt: { $gt: new Date() }
  }).sort({ generatedAt: -1 });
};

// Static method to archive old recommendations
recommendationSchema.statics.archiveExpiredRecommendations = function() {
  return this.updateMany(
    { 
      expiresAt: { $lt: new Date() },
      isActive: true 
    },
    { 
      $set: { isActive: false } 
    }
  );
};

export default mongoose.model('Recommendation', recommendationSchema);













