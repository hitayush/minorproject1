import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          education: user.education,
          skills: user.skills,
          interests: user.interests,
          experience: user.experience,
          preferences: user.preferences,
          isVerified: user.isVerified,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const { 
      name, 
      education, 
      skills, 
      interests, 
      experience, 
      preferences 
    } = req.body;

    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (education) user.education = { ...user.education, ...education };
    if (skills) user.skills = skills;
    if (interests) user.interests = interests;
    if (experience) user.experience = { ...user.experience, ...experience };
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          education: user.education,
          skills: user.skills,
          interests: user.interests,
          experience: user.experience,
          preferences: user.preferences
        }
      }
    });
  } catch (error) {
    next(error);
  }
};













