#!/bin/bash

echo "🚀 Push to GitHub - Appadam of My Eye"
echo "====================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the food-blog directory"
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: GitHub username is required"
    exit 1
fi

echo ""
echo "🔧 Setting up git repository..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Add all files
echo "📦 Adding all files to git..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "💾 Creating commit..."
    git commit -m "Initial commit - Appadam of My Eye food blog"
fi

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

# Add remote origin
echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USERNAME/food-blog.git"

# Push to GitHub
echo "📤 Pushing to GitHub..."
echo "   Repository: https://github.com/$GITHUB_USERNAME/food-blog"
echo ""

if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your repository is now live at:"
    echo "   https://github.com/$GITHUB_USERNAME/food-blog"
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Go to AWS Amplify: https://console.aws.amazon.com/amplify"
    echo "2. Create new app → Host web app"
    echo "3. Connect your GitHub repository"
    echo "4. Deploy automatically"
    echo ""
    echo "📚 See DOMAIN_DEPLOYMENT_GUIDE.md for detailed instructions"
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo ""
    echo "🔍 Troubleshooting:"
    echo "1. Make sure the repository exists at: https://github.com/$GITHUB_USERNAME/food-blog"
    echo "2. Check your GitHub credentials"
    echo "3. Try: git remote -v (to verify remote URL)"
    echo "4. Try: git status (to check repository status)"
    echo ""
fi 