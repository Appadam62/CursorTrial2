import React from 'react';
import { Search, Instagram } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <h1>
              <span className="logo-icon">
                <img 
                  src="/images/Appadam Logo.png" 
                  alt="Appadam of My Eye Logo" 
                  width="48" 
                  height="48"
                  className="logo-image"
                />
              </span>
              <div className="logo-text-container">
                <span className="logo-text">appadam</span>
                <span className="logo-subtitle">of my eye</span>
              </div>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="navigation" role="navigation" aria-label="Main navigation">
            <ul className="nav-list">
              <li><a href="#recipes" aria-label="Browse recipes">RECIPES</a></li>
              <li><a href="#travel-life" aria-label="Travel and lifestyle content">TRAVEL & LIFE</a></li>
              <li><a href="#about" aria-label="About us">ABOUT</a></li>
            </ul>
          </nav>

          {/* Call to Action Button */}
          <div className="cta-section">
            <button className="cta-button" aria-label="Shop my Amazon recommendations">
              SHOP MY AMAZON
            </button>
          </div>

          {/* Social Media & Search */}
          <div className="social-search" role="group" aria-label="Social media and search">
            <a href="#" aria-label="Follow us on Instagram" className="social-link">
              <Instagram size={20} aria-hidden="true" />
            </a>
            <button className="search-button" aria-label="Search recipes">
              <Search size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 