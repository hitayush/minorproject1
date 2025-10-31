#!/bin/bash

# Build script for production deployment
echo "🚀 Building Careerly AI for production..."

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build frontend
echo "🏗️  Building frontend..."
npm run build-frontend

echo "✅ Build complete! Ready for production deployment."
echo "💡 Make sure to set NODE_ENV=production in your environment variables."

