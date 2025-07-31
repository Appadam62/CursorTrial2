// Google AdSense Configuration
// Replace 'YOUR_PUBLISHER_ID' with your actual AdSense publisher ID

export const ADSENSE_CONFIG = {
  // Your AdSense Publisher ID (ca-pub-XXXXXXXXXX)
  publisherId: 'ca-pub-YOUR_PUBLISHER_ID',
  
  // Test mode - set to false for production
  testMode: true,
  
  // Ad placements configuration
  placements: {
    // Header banner (728x90)
    header: {
      slot: 'header-banner',
      format: 'auto',
      responsive: true,
      className: 'ad-header'
    },
    
    // Sidebar rectangle (300x250)
    sidebar: {
      slot: 'sidebar-rectangle',
      format: 'auto',
      responsive: true,
      className: 'ad-sidebar'
    },
    
    // Content inline (728x90)
    content: {
      slot: 'content-inline',
      format: 'auto',
      responsive: true,
      className: 'ad-content'
    },
    
    // Footer banner (728x90)
    footer: {
      slot: 'footer-banner',
      format: 'auto',
      responsive: true,
      className: 'ad-footer'
    },
    
    // Mobile banner (320x50)
    mobile: {
      slot: 'mobile-banner',
      format: 'auto',
      responsive: true,
      className: 'ad-mobile'
    },
    
    // Recipe page sidebar (300x600)
    recipeSidebar: {
      slot: 'recipe-sidebar',
      format: 'auto',
      responsive: true,
      className: 'ad-sidebar'
    },
    
    // Between recipes (728x90)
    betweenRecipes: {
      slot: 'between-recipes',
      format: 'auto',
      responsive: true,
      className: 'ad-content'
    }
  },
  
  // Ad display rules
  rules: {
    // Show ads after every N recipes
    showAfterRecipes: 3,
    
    // Minimum content length before showing ads
    minContentLength: 300,
    
    // Don't show ads on admin pages
    excludePages: ['/admin', '/login'],
    
    // User experience settings
    userExperience: {
      // Don't show too many ads
      maxAdsPerPage: 4,
      
      // Minimum spacing between ads
      minSpacing: 200,
      
      // Don't show ads for users with ad blockers
      respectAdBlockers: true
    }
  },
  
  // Ad formats and sizes
  formats: {
    banner: {
      desktop: '728x90',
      tablet: '728x90',
      mobile: '320x50'
    },
    rectangle: {
      desktop: '300x250',
      tablet: '300x250',
      mobile: '300x250'
    },
    skyscraper: {
      desktop: '300x600',
      tablet: '300x600',
      mobile: '300x250'
    },
    responsive: {
      desktop: 'auto',
      tablet: 'auto',
      mobile: 'auto'
    }
  }
};

// Helper function to get ad config by placement
export const getAdConfig = (placement) => {
  return ADSENSE_CONFIG.placements[placement] || null;
};

// Helper function to check if ads should be shown
export const shouldShowAds = (currentPage, contentLength = 0) => {
  const { rules } = ADSENSE_CONFIG;
  
  // Check if page is excluded
  if (rules.excludePages.some(page => currentPage.includes(page))) {
    return false;
  }
  
  // Check content length
  if (contentLength < rules.minContentLength) {
    return false;
  }
  
  return true;
};

// Helper function to get responsive ad format
export const getResponsiveAdFormat = (deviceType = 'desktop') => {
  return ADSENSE_CONFIG.formats.responsive[deviceType] || 'auto';
}; 