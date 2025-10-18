import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is provided
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not defined');
      console.log('📝 Please create a .env file in the backend directory with your MongoDB connection string');
      console.log('📝 Example: MONGODB_URI=mongodb://localhost:27017/careerly-ai');
      console.log('📝 Or use MongoDB Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerly-ai');
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    console.log('🔄 Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔒 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Troubleshooting tips:');
    console.log('   1. Make sure MongoDB is running (if using local)');
    console.log('   2. Check your connection string in .env file');
    console.log('   3. Verify network access (if using Atlas)');
    console.log('   4. Check if your IP is whitelisted (if using Atlas)');
    process.exit(1);
  }
};

export default connectDB;
