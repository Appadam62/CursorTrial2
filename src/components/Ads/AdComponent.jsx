import React, { useEffect, useRef } from 'react';
import './AdComponent.css';

const AdComponent = ({ 
  adSlot, 
  adFormat = 'auto', 
  adStyle = 'display', 
  className = '',
  responsive = true,
  testMode = false 
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    // Wait for Google AdSense to load
    if (window.adsbygoogle && !testMode) {
      try {
        // Push the ad to Google AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [testMode]);

  // Test mode - show placeholder
  if (testMode) {
    return (
      <div className={`ad-placeholder ${className}`}>
        <div className="ad-placeholder-content">
          <h4>Ad Space</h4>
          <p>Format: {adFormat}</p>
          <p>Slot: {adSlot}</p>
          <small>Test Mode - Replace with actual AdSense code</small>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: adStyle }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your AdSense publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default AdComponent; 