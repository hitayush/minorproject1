import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testConnection = async () => {
  try {
    console.log('🧪 Testing MongoDB Connection...');
    console.log('📋 Environment Check:');
    console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
    console.log(`   - MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Not set'}`);
    
    if (!process.env.MONGODB_URI) {
      console.log('\n❌ MONGODB_URI not found in environment variables');
      console.log('📝 Please create a .env file in the backend directory with:');
      console.log('   MONGODB_URI=mongodb://localhost:27017/careerly-ai');
      console.log('   Or use MongoDB Atlas connection string');
      process.exit(1);
    }

    console.log('\n🔄 Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Successfully connected to MongoDB!');
    console.log(`   - Host: ${conn.connection.host}`);
    console.log(`   - Database: ${conn.connection.name}`);
    console.log(`   - Ready State: ${conn.connection.readyState} (1 = connected)`);
    
    // Test a simple operation
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`   - Collections: ${collections.length}`);
    
    console.log('\n🎉 Database connection test passed!');
    console.log('✅ Your application is ready to use MongoDB');
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔒 Connection closed');
    
  } catch (error) {
    console.error('\n❌ Database connection test failed:');
    console.error(`   Error: ${error.message}`);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Make sure MongoDB is running (if using local)');
    console.log('   2. Check your connection string format');
    console.log('   3. Verify network access (if using Atlas)');
    console.log('   4. Check if your IP is whitelisted (if using Atlas)');
    console.log('   5. Ensure you have the correct username/password');
    process.exit(1);
  }
};

testConnection();








