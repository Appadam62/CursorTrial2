#!/bin/bash

echo "🚀 GitHub Repository Setup for Appadam of My Eye"
echo "================================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   Download from: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed: $(git --version)"
echo ""

# Check if git is configured
GIT_NAME=$(git config --global user.name 2>/dev/null)
GIT_EMAIL=$(git config --global user.email 2>/dev/null)

if [ -z "$GIT_NAME" ] || [ -z "$GIT_EMAIL" ]; then
    echo "🔧 Git configuration needed:"
    echo ""
    
    # Get user input
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    read -p "Enter your email address: " GITHUB_EMAIL
    read -p "Enter your full name: " FULL_NAME
    
    # Configure git
    git config --global user.name "$FULL_NAME"
    git config --global user.email "$GITHUB_EMAIL"
    
    echo ""
    echo "✅ Git configured with:"
    echo "   Name: $FULL_NAME"
    echo "   Email: $GITHUB_EMAIL"
    echo ""
else
    echo "✅ Git is already configured:"
    echo "   Name: $GIT_NAME"
    echo "   Email: $GIT_EMAIL"
    echo ""
fi

echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Create GitHub Repository:"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: food-blog"
echo "   - Description: A modern food blog featuring authentic Indian recipes"
echo "   - Make it Public"
echo "   - Don't initialize with README (we already have one)"
echo "   - Click 'Create repository'"
echo ""
echo "2. After creating the repository, run these commands:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit - Appadam of My Eye food blog'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/food-blog.git"
echo "   git push -u origin main"
echo ""
echo "3. Or run the automated script:"
echo "   ./push-to-github.sh"
echo ""

# Ask if user wants to proceed with git setup
read -p "Do you want to initialize git and prepare for push? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🔧 Initializing git repository..."
    git init
    
    echo "📦 Adding all files..."
    git add .
    
    echo "💾 Creating initial commit..."
    git commit -m "Initial commit - Appadam of My Eye food blog"
    
    echo "🌿 Setting main branch..."
    git branch -M main
    
    echo ""
    echo "✅ Git repository initialized!"
    echo ""
    echo "🎯 Now create your GitHub repository and run:"
    echo "   git remote add origin https://github.com/$GITHUB_USERNAME/food-blog.git"
    echo "   git push -u origin main"
    echo ""
else
    echo ""
    echo "📝 Manual steps:"
    echo "1. Create GitHub repository at https://github.com/new"
    echo "2. Run the git commands shown above"
    echo ""
fi

echo "📚 For more help, see: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" 