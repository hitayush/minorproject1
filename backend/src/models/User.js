import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  education: {
    level: {
      type: String,
      enum: ['10th', '12th', 'Graduation', 'Post Graduation', 'PhD'],
      default: '12th'
    },
    field: {
      type: String,
      trim: true
    },
    institution: {
      type: String,
      trim: true
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  experience: {
    years: {
      type: Number,
      default: 0,
      min: 0
    },
    field: {
      type: String,
      trim: true
    }
  },
  preferences: {
    workType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Remote', 'Hybrid', 'Freelance'],
      default: 'Full-time'
    },
    location: {
      type: String,
      trim: true
    },
    salaryRange: {
      min: Number,
      max: Number
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update last login
userSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  await this.save();
};

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'education.level': 1 });
userSchema.index({ 'education.field': 1 });
userSchema.index({ skills: 1 });
userSchema.index({ interests: 1 });
userSchema.index({ lastLogin: -1 });
userSchema.index({ createdAt: -1 });

// Static method to get users by education level
userSchema.statics.getUsersByEducationLevel = function(level) {
  return this.find({ 'education.level': level }).select('name email education skills interests');
};

// Static method to get users by skills
userSchema.statics.getUsersBySkills = function(skills) {
  return this.find({ skills: { $in: skills } }).select('name email skills interests');
};

export default mongoose.model('User', userSchema);





