# 🚀 How to Start Your Careerly AI Project

## The Issue You're Facing

The error "Missing script: dev" occurs because you're trying to run `npm run dev` from the wrong directory. Here's how to fix it:

## ✅ Correct Way to Start the Servers

### Method 1: Manual Startup (Recommended)

**Step 1: Start the Backend Server**
```bash
# Open PowerShell/Terminal 1
cd C:\Users\HITAYUSH\OneDrive\Documents\projects\newproject\backend
npm run dev
```

**Step 2: Start the Frontend Server**
```bash
# Open PowerShell/Terminal 2 (new window)
cd C:\Users\HITAYUSH\OneDrive\Documents\projects\newproject\frontend
npm run dev
```

### Method 2: Using the Startup Script

I'll create a PowerShell script to start both servers automatically:

```powershell
# Save this as start-both-servers.ps1
Write-Host "🚀 Starting Careerly AI Servers..." -ForegroundColor Green

# Start Backend
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\HITAYUSH\OneDrive\Documents\projects\newproject\backend'; npm run dev"

# Wait a moment
Start-Sleep 3

# Start Frontend
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\HITAYUSH\Documents\projects\newproject\frontend'; npm run dev"

Write-Host "✅ Both servers started!" -ForegroundColor Green
Write-Host "📊 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🎨 Frontend: http://localhost:5173" -ForegroundColor Cyan
```

## 🔍 Troubleshooting

### If Backend Won't Start:
1. **Check if MongoDB is running:**
   ```bash
   # Check if MongoDB is installed and running
   mongod --version
   ```

2. **Check your .env file:**
   ```bash
   cd backend
   # Make sure .env file exists
   dir .env
   ```

3. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

### If Frontend Won't Start:
1. **Check dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Clear cache:**
   ```bash
   cd frontend
   npm run dev -- --force
   ```

## 📱 Access Your Application

Once both servers are running:
- **Frontend (Main App):** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 🎯 Quick Test

1. Open http://localhost:5173 in your browser
2. You should see the Careerly AI homepage
3. Click "Start Chatting" to test the chatbot
4. Try creating an account to test authentication

## 💡 Pro Tip

Always make sure you're in the correct directory before running npm commands:
- For backend: `backend/` directory
- For frontend: `frontend/` directory

The error happens because npm looks for `package.json` in the current directory, and each directory has different scripts.
