# 🗄️ Database Setup Guide for Careerly AI

## Quick Setup Steps

### Step 1: Choose Your MongoDB Option

#### Option A: MongoDB Atlas (Cloud - Recommended) 🌐
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a free cluster (M0 Sandbox)
4. Get your connection string
5. Skip to Step 3

#### Option B: Local MongoDB Installation 💻
1. Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Install MongoDB
3. Start MongoDB service: `net start MongoDB` (run as administrator)
4. Use connection string: `mongodb://localhost:27017/careerly-ai`

### Step 2: Create Environment File

Create a `.env` file in the `backend` directory with the following content:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/careerly-ai
# For Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerly-ai?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Hugging Face API
HUGGING_FACE_API_KEY=your-hugging-face-api-key-here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Step 3: Test Database Connection

Run the database connection test:

```bash
cd backend
node test-db-connection.js
```

### Step 4: Start the Backend Server

```bash
cd backend
npm start
```

### Step 5: Verify Everything Works

1. Check the console for successful MongoDB connection
2. Visit `http://localhost:5000/api/health` to test the API
3. Test chat endpoint at `http://localhost:5000/api/chat`

## Troubleshooting

### Common Issues:

1. **MONGODB_URI not defined**
   - Make sure `.env` file exists in `backend` directory
   - Check the file has the correct format

2. **Connection refused (local MongoDB)**
   - Make sure MongoDB is running: `net start MongoDB`
   - Check if MongoDB is installed properly

3. **Authentication failed (Atlas)**
   - Verify username and password in connection string
   - Check if your IP is whitelisted in Atlas

4. **Network timeout (Atlas)**
   - Check your internet connection
   - Verify the connection string format

## Database Features

✅ **Models Available:**
- User (with authentication, profile, preferences)
- Chat (conversation history, sessions)
- Recommendation (AI-powered career suggestions)

✅ **Indexes Added:**
- User: email, education level, skills, interests
- Chat: userId, sessionId, timestamps
- Recommendation: userId, active status, expiration

✅ **Connection Features:**
- Automatic reconnection
- Graceful shutdown
- Error handling with helpful messages
- Connection state monitoring

## Next Steps

After successful setup:
1. Test user registration/login
2. Test chat functionality
3. Test recommendation generation
4. Monitor database performance

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify your MongoDB connection string
3. Ensure all environment variables are set
4. Test with the provided test script









