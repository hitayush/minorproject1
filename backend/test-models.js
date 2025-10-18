import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Chat from './src/models/Chat.js';
import Recommendation from './src/models/Recommendation.js';

// Load environment variables
dotenv.config();

const testModels = async () => {
  try {
    console.log('🧪 Testing Database Models...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Test User Model
    console.log('\n📝 Testing User Model...');
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123',
      education: {
        level: '12th',
        field: 'Science'
      },
      skills: ['JavaScript', 'Python'],
      interests: ['Web Development', 'AI']
    });
    
    // Save user (this will trigger password hashing)
    await testUser.save();
    console.log('✅ User model test passed - User created successfully');
    
    // Test Chat Model
    console.log('\n💬 Testing Chat Model...');
    const testChat = new Chat({
      userId: testUser._id,
      sessionId: 'test-session-123',
      messages: [{
        role: 'user',
        content: 'Hello, I need career guidance'
      }, {
        role: 'assistant',
        content: 'Hello! I\'d be happy to help you with career guidance.'
      }],
      topic: 'career-guidance'
    });
    
    await testChat.save();
    console.log('✅ Chat model test passed - Chat created successfully');
    
    // Test Recommendation Model
    console.log('\n🎯 Testing Recommendation Model...');
    const testRecommendation = new Recommendation({
      userId: testUser._id,
      recommendations: [{
        title: 'Learn Web Development',
        description: 'Start with HTML, CSS, and JavaScript',
        category: 'skill-development',
        priority: 'high',
        actionItems: [{
          task: 'Complete HTML basics',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }],
        resources: [{
          title: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/',
          type: 'website'
        }]
      }]
    });
    
    await testRecommendation.save();
    console.log('✅ Recommendation model test passed - Recommendation created successfully');
    
    // Test queries
    console.log('\n🔍 Testing Database Queries...');
    
    // Find user by email
    const foundUser = await User.findOne({ email: 'test@example.com' });
    console.log(`✅ User query test - Found user: ${foundUser.name}`);
    
    // Find user's chats
    const userChats = await Chat.find({ userId: testUser._id });
    console.log(`✅ Chat query test - Found ${userChats.length} chats for user`);
    
    // Find user's recommendations
    const userRecommendations = await Recommendation.find({ userId: testUser._id });
    console.log(`✅ Recommendation query test - Found ${userRecommendations.length} recommendations for user`);
    
    // Clean up test data
    console.log('\n🧹 Cleaning up test data...');
    await User.deleteOne({ email: 'test@example.com' });
    await Chat.deleteMany({ userId: testUser._id });
    await Recommendation.deleteMany({ userId: testUser._id });
    console.log('✅ Test data cleaned up');
    
    console.log('\n🎉 All model tests passed successfully!');
    console.log('✅ Database connection is working perfectly');
    console.log('✅ All models are properly configured');
    console.log('✅ Database operations are functioning correctly');
    
  } catch (error) {
    console.error('\n❌ Model test failed:');
    console.error(`   Error: ${error.message}`);
    console.log('\n💡 This might indicate:');
    console.log('   1. Database connection issues');
    console.log('   2. Model schema problems');
    console.log('   3. Missing required fields');
  } finally {
    await mongoose.connection.close();
    console.log('\n🔒 Database connection closed');
  }
};

testModels();



