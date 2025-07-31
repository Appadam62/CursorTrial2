#!/bin/bash

# Deployment Script for Appadam of My Eye Food Blog
# This script helps prepare and deploy the website

echo "🚀 Starting deployment process for appadamofmyeye.com..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the food-blog directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests (if any)
echo "🧪 Running tests..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist folder not found. Build may have failed."
    exit 1
fi

echo "📁 Build files created in dist/ folder"
echo "📊 Build size:"
du -sh dist/

echo ""
echo "🎯 Next Steps:"
echo "1. Create GitHub repository: https://github.com/new"
echo "2. Push code to GitHub:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit - Appadam of My Eye food blog'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/food-blog.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to AWS Amplify:"
echo "   - Go to: https://console.aws.amazon.com/amplify"
echo "   - Create new app → Host web app"
echo "   - Connect GitHub repository"
echo "   - Deploy automatically"
echo ""
echo "4. Add custom domain:"
echo "   - In Amplify Console → Domain Management"
echo "   - Add domain: appadamofmyeye.com"
echo "   - Update DNS records at your registrar"
echo ""
echo "📚 See DOMAIN_DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🎉 Your food blog will be live at appadamofmyeye.com!" 