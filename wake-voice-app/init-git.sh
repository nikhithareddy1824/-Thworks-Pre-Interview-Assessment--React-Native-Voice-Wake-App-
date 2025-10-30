#!/bin/bash

# Initialize Git repository for wake-voice-app
# Run this script to set up version control

echo "🔧 Initializing Git repository..."

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
    echo "✅ Git repository initialized"
else
    echo "ℹ️  Git repository already exists"
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Wake-word voice app

- Expo project with react-native-voice
- Wake phrase detection for 'hey thworks'
- Voice command recognition
- UI with status indicators
- Documentation (README, DECLARATION, notes)
- Native Android and iOS projects generated"

echo ""
echo "✅ Git repository initialized successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Create a GitHub repository"
echo "2. Add remote: git remote add origin <your-repo-url>"
echo "3. Push: git push -u origin main"
echo ""

