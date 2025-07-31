# Domain Deployment Guide: appadamofmyeye.com

## 🎯 **Overview**

This guide will help you deploy your food blog to `appadamofmyeye.com` using AWS Amplify. The setup includes automatic deployments, SSL certificates, and CDN distribution.

## 📋 **Prerequisites**

### **What You Need:**
- ✅ AWS Account
- ✅ Domain: `appadamofmyeye.com`
- ✅ Domain registrar access
- ✅ GitHub account (for code repository)

### **Domain Requirements:**
- Domain must be active and accessible
- DNS management access
- Ability to update nameservers (if needed)

## 🚀 **Step-by-Step Deployment**

### **Step 1: Prepare Your Code**

1. **Create GitHub Repository**:
   ```bash
   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit - Appadam of My Eye food blog"
   
   # Create GitHub repository and push
   # Go to GitHub.com → New Repository → food-blog
   git remote add origin https://github.com/YOUR_USERNAME/food-blog.git
   git branch -M main
   git push -u origin main
   ```

2. **Verify Build Works**:
   ```bash
   npm run build
   # Should create 'dist' folder with built files
   ```

### **Step 2: Set Up AWS Amplify**

1. **Go to AWS Amplify Console**:
   - Visit: https://console.aws.amazon.com/amplify
   - Sign in to your AWS account

2. **Create New App**:
   - Click "New app" → "Host web app"
   - Choose "GitHub" as repository source
   - Connect your GitHub account
   - Select your `food-blog` repository
   - Click "Next"

3. **Configure Build Settings**:
   - **Repository**: Your food-blog repository
   - **Branch**: `main`
   - **Build settings**: Use the `amplify.yml` file (already created)
   - Click "Next"

4. **Review and Deploy**:
   - Review settings
   - Click "Save and deploy"
   - Wait for first deployment (5-10 minutes)

### **Step 3: Add Custom Domain**

1. **Go to Domain Management**:
   - In Amplify Console, click your app
   - Go to "Domain Management" tab
   - Click "Add domain"

2. **Enter Domain**:
   - **Domain name**: `appadamofmyeye.com`
   - **Subdomain**: Leave blank (or add `www` if desired)
   - Click "Configure domain"

3. **Configure Subdomains**:
   - **www.appadamofmyeye.com** → Main app
   - **appadamofmyeye.com** → Main app (apex domain)
   - Click "Save"

### **Step 4: Update DNS Settings**

1. **Get DNS Records**:
   - Amplify will provide DNS records to add
   - Copy the CNAME and A records

2. **Update Domain Registrar**:
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Find DNS management for `appadamofmyeye.com`
   - Add the provided DNS records

#### **Example DNS Records**:
```
Type: CNAME
Name: www
Value: d1234567890.cloudfront.net

Type: A
Name: @ (or leave blank)
Value: 192.0.2.1 (Amplify will provide actual IP)
```

3. **Wait for Propagation**:
   - DNS changes take 24-48 hours
   - You can check with: `nslookup appadamofmyeye.com`

### **Step 5: SSL Certificate**

1. **Automatic SSL**:
   - Amplify automatically provisions SSL certificates
   - HTTPS will be enabled automatically
   - No additional configuration needed

2. **Verify SSL**:
   - Visit `https://appadamofmyeye.com`
   - Should show secure connection

## 🔧 **Alternative: Manual AWS Setup**

If you prefer more control, here's the S3 + CloudFront approach:

### **Step 1: Create S3 Bucket**
```bash
# Using AWS CLI
aws s3 mb s3://appadamofmyeye.com
aws s3 website s3://appadamofmyeye.com --index-document index.html --error-document index.html
```

### **Step 2: Upload Files**
```bash
npm run build
aws s3 sync dist/ s3://appadamofmyeye.com
```

### **Step 3: Create CloudFront Distribution**
- Origin: S3 bucket
- Alternate domain names: `appadamofmyeye.com`, `www.appadamofmyeye.com`
- SSL certificate: Request from AWS Certificate Manager

### **Step 4: Update DNS**
- Point domain to CloudFront distribution

## 📊 **Cost Breakdown**

### **AWS Amplify (Recommended)**:
- **Free Tier**: 1,000 build minutes/month, 15GB storage, 15GB bandwidth
- **After Free Tier**: ~$1-5/month for typical food blog
- **Custom Domain**: Free
- **SSL Certificate**: Free

### **S3 + CloudFront**:
- **S3 Storage**: ~$0.023/GB/month
- **CloudFront**: ~$0.085/GB (first 1TB free)
- **Route 53**: $0.50/month per hosted zone
- **Total**: ~$1-3/month

## 🎨 **Customization Options**

### **Environment Variables**:
```bash
# In Amplify Console → Environment Variables
REACT_APP_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXX
REACT_APP_GOOGLE_ANALYTICS_ID=GA_XXXXXXXXX
```

### **Custom Headers**:
```yaml
# amplify.yml
customHeaders:
  - pattern: '**/*'
    headers:
      - key: 'X-Frame-Options'
        value: 'SAMEORIGIN'
      - key: 'X-Content-Type-Options'
        value: 'nosniff'
```

### **Redirects**:
```yaml
# amplify.yml
redirects:
  - source: '/old-page'
    target: '/new-page'
    status: '301'
```

## 🔍 **Testing & Verification**

### **Pre-Deployment Tests**:
```bash
# Build test
npm run build

# Local preview
npm run preview

# Check for errors
npm run lint
```

### **Post-Deployment Checks**:
- ✅ Website loads at `appadamofmyeye.com`
- ✅ HTTPS works
- ✅ Mobile responsive
- ✅ All images load
- ✅ Navigation works
- ✅ Search functionality
- ✅ AdSense integration (if configured)

## 🚨 **Common Issues & Solutions**

### **DNS Issues**:
- **Problem**: Domain not resolving
- **Solution**: Wait 24-48 hours for DNS propagation
- **Check**: Use `nslookup` or `dig` commands

### **SSL Issues**:
- **Problem**: Mixed content warnings
- **Solution**: Ensure all resources use HTTPS
- **Check**: Browser developer tools

### **Build Failures**:
- **Problem**: Amplify build fails
- **Solution**: Check build logs, fix errors
- **Common**: Missing dependencies, syntax errors

### **Performance Issues**:
- **Problem**: Slow loading
- **Solution**: Optimize images, enable compression
- **Tools**: Google PageSpeed Insights

## 📈 **Performance Optimization**

### **Image Optimization**:
```bash
# Install image optimization
npm install --save-dev imagemin imagemin-webp

# Add to build process
# Optimize images in public/images/
```

### **Code Splitting**:
```javascript
// Already configured in vite.config.js
// Manual chunks for better caching
```

### **Caching Strategy**:
```yaml
# amplify.yml
cache:
  paths:
    - node_modules/**/*
    - dist/assets/**/*
```

## 🔄 **Continuous Deployment**

### **Automatic Deployments**:
- Push to `main` branch → Automatic deployment
- Preview deployments for pull requests
- Branch-specific environments

### **Deployment Notifications**:
- Email notifications
- Slack integration
- GitHub status checks

## 📞 **Support Resources**

- **AWS Amplify Docs**: https://docs.aws.amazon.com/amplify/
- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://reactjs.org/
- **AWS Support**: Available with paid plans

## 🎯 **Next Steps After Deployment**

1. **Set up Google Analytics**
2. **Configure Google AdSense**
3. **Set up email newsletter**
4. **Create social media accounts**
5. **Start content marketing**
6. **Monitor performance**
7. **Optimize for SEO**

---

**Your food blog will be live at `appadamofmyeye.com`!** 🎉

The deployment process typically takes 30-60 minutes, plus DNS propagation time. Once complete, your blog will be accessible worldwide with fast loading times and automatic SSL security. 