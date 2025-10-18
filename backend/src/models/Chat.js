import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.isAnonymous === false;
    }
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      model: String,
      tokens: Number,
      responseTime: Number
    }
  }],
  isAnonymous: {
    type: Boolean,
    default: false
  },
  topic: {
    type: String,
    enum: ['career-guidance', 'skill-assessment', 'job-search', 'education', 'general'],
    default: 'career-guidance'
  },
  summary: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
chatSchema.index({ userId: 1, createdAt: -1 });
chatSchema.index({ sessionId: 1 });
chatSchema.index({ 'messages.timestamp': -1 });

// Virtual for message count
chatSchema.virtual('messageCount').get(function() {
  return this.messages.length;
});

// Method to add a message
chatSchema.methods.addMessage = function(role, content, metadata = {}) {
  this.messages.push({
    role,
    content,
    timestamp: new Date(),
    metadata
  });
  return this.save();
};

// Method to get recent messages
chatSchema.methods.getRecentMessages = function(limit = 10) {
  return this.messages
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
};

// Static method to get user's chat history
chatSchema.statics.getUserChats = function(userId, limit = 20) {
  return this.find({ userId })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .select('messages sessionId topic summary createdAt updatedAt');
};

export default mongoose.model('Chat', chatSchema);
