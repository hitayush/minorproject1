# 🗄️ Install MongoDB on Windows

## Quick Installation Steps:

### Method 1: Using Chocolatey (Recommended)
```powershell
# Install Chocolatey first (if not installed)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install MongoDB
choco install mongodb
```

### Method 2: Manual Installation
1. Go to: https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Run the installer
4. Choose "Complete" installation
5. Install as a Windows Service

### Method 3: Using MongoDB Atlas (Cloud - No Installation)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster
4. Get connection string
5. Update .env file

## After Installation:
```bash
# Start MongoDB service
net start MongoDB

# Or start manually
mongod
```

## Test Connection:
```bash
# Test if MongoDB is running
mongosh
```

## Update .env file:
```
MONGODB_URI=mongodb://localhost:27017/careerly-ai
```
