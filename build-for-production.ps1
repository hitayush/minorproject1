# Build script for production deployment (PowerShell)
Write-Host "🚀 Building Careerly AI for production..." -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm run install-all

# Build frontend
Write-Host "🏗️  Building frontend..." -ForegroundColor Yellow
npm run build-frontend

Write-Host "✅ Build complete! Ready for production deployment." -ForegroundColor Green
Write-Host "💡 Make sure to set NODE_ENV=production in your environment variables." -ForegroundColor Cyan

