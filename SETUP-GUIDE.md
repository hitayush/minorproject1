# Careerly AI - Project Setup Guide

## 🚀 Quick Start

Your project is ready to run! Here's how to get it started:

### 1. Environment Setup

1. **Copy environment file:**
   ```bash
   cd backend
   copy env.example .env
   ```

2. **Update `.env` file with your credentials:**
   ```env
   # Database (choose one option)
   MONGODB_URI=mongodb://localhost:27017/careerly-ai  # Local MongoDB
   # OR
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerly-ai  # MongoDB Atlas

   # JWT Secret (change this!)
   JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

   # Hugging Face API (get from https://huggingface.co/settings/tokens)
   HUGGING_FACE_API_KEY=your-hugging-face-api-key-here
   ```

### 2. Database Setup

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/careerly-ai` in .env

**Option B: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update MONGODB_URI in .env

### 3. Start the Application

**Method 1: Using the startup script**
```bash
./start-project.ps1
```

**Method 2: Manual startup**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 🎯 Features Available

✅ **Authentication System**
- User registration and login
- JWT-based authentication
- Protected routes

✅ **AI Chatbot**
- Career guidance chatbot
- Hugging Face AI integration
- Anonymous and authenticated chat

✅ **User Dashboard**
- Profile management
- Chat history
- Career recommendations

✅ **Modern UI**
- React with Tailwind CSS
- Dark/Light theme toggle
- Responsive design

## 🔧 Troubleshooting

### Backend won't start?
1. Check if MongoDB is running
2. Verify .env file exists and has correct values
3. Check console for error messages

### Frontend won't connect to backend?
1. Ensure backend is running on port 5000
2. Check CORS settings in backend/app.js
3. Verify API_BASE_URL in frontend/src/utils/api.js

### Chatbot not responding?
1. Check Hugging Face API key in .env
2. Verify internet connection
3. Check browser console for errors

## 📱 Testing the Application

1. **Visit the homepage** - Should show landing page
2. **Try anonymous chat** - Go to /chatbot and start chatting
3. **Create an account** - Sign up and login
4. **Test authenticated features** - Dashboard, profile, etc.

## 🚀 Next Steps

Your project is fully functional! You can:

1. **Customize the AI model** - Change the Hugging Face model in chatController.js
2. **Add more features** - Job search, skill assessments, etc.
3. **Deploy to production** - Use services like Vercel, Netlify, Heroku
4. **Enhance UI** - Add more components, animations, etc.

## 📞 Need Help?

The project structure is well-organized:
- `backend/src/` - All backend code
- `frontend/src/` - All frontend code
- Check individual README files in each directory for more details

Happy coding! 🎉
