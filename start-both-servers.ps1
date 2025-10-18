# Careerly AI - Start Both Servers Script
Write-Host "🚀 Starting Careerly AI Servers..." -ForegroundColor Green

# Get the current directory (project root)
$projectRoot = Get-Location

# Start Backend Server
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Blue
$backendPath = Join-Path $projectRoot "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Backend Server Starting...' -ForegroundColor Yellow; npm run dev"

# Wait a moment
Start-Sleep 3

# Start Frontend Server
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Blue
$frontendPath = Join-Path $projectRoot "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Frontend Server Starting...' -ForegroundColor Yellow; npm run dev"

# Wait a moment
Start-Sleep 3

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host "📊 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🎨 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 What to do next:" -ForegroundColor Yellow
Write-Host "   1. Wait for both servers to fully start (about 10-15 seconds)" -ForegroundColor Gray
Write-Host "   2. Open http://localhost:5173 in your browser" -ForegroundColor Gray
Write-Host "   3. Test the application by clicking 'Start Chatting'" -ForegroundColor Gray
Write-Host ""
Write-Host "🔧 If servers don't start:" -ForegroundColor Yellow
Write-Host "   1. Make sure MongoDB is running" -ForegroundColor Gray
Write-Host "   2. Check that .env file exists in backend folder" -ForegroundColor Gray
Write-Host "   3. Run 'npm install' in both backend and frontend folders" -ForegroundColor Gray
