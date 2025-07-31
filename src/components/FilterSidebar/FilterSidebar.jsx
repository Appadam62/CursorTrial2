import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import AdComponent from '../Ads/AdComponent';
import { mealTypes, dietary } from '../../data/recipes';
import { ADSENSE_CONFIG, shouldShowAds } from '../../config/adsConfig';
import './FilterSidebar.css';

const FilterSidebar = ({ searchTerm, onSearchChange, selectedFilters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    recipeType: true,
    mealType: true,
    dietary: true
  });

  const recipeTypes = [
    "Everything Telugu",
    "Pan Indian", 
    "World Cuisine",
    "Everything Bread"
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterToggle = (filterType, value) => {
    const currentFilters = selectedFilters[filterType] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFilterChange(filterType, newFilters);
  };

  return (
    <aside className="filter-sidebar">
      {/* About Me Section */}
      <div className="about-me-section">
        <div className="profile-photo">
          <img 
            src="/images/profile-photo.jpg" 
            alt="Appadam of My Eye - Indian Food Blogger" 
            className="profile-image"
          />
        </div>
        <div className="about-content">
          <h3 className="about-title">Appadam of My Eye 👁️</h3>
          <p className="about-description">
            Sharing the love for authentic Indian cuisine, one recipe at a time! 
            From traditional family recipes to modern twists, discover the rich 
            flavors and aromas of Indian cooking. Every dish tells a story of 
            culture, tradition, and love for food.
          </p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Recipes</span>
            </div>
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="stat">
              <span className="stat-number">25K+</span>
              <span className="stat-label">Followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Recipe Type Filters */}
      <div className="filter-section">
        <button 
          className="filter-section-header"
          onClick={() => toggleSection('recipeType')}
          aria-expanded={expandedSections.recipeType}
        >
          <span>Recipe Categories</span>
          {expandedSections.recipeType ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {expandedSections.recipeType && (
          <div className="filter-pills">
            {recipeTypes.map((recipeType) => (
              <button
                key={recipeType}
                className={`filter-pill ${selectedFilters.recipeType?.includes(recipeType) ? 'active' : ''}`}
                onClick={() => handleFilterToggle('recipeType', recipeType)}
              >
                {recipeType}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Meal Type Filters */}
      <div className="filter-section">
        <button 
          className="filter-section-header"
          onClick={() => toggleSection('mealType')}
          aria-expanded={expandedSections.mealType}
        >
          <span>By Meal Type</span>
          {expandedSections.mealType ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {expandedSections.mealType && (
          <div className="filter-pills">
            {mealTypes.map((mealType) => (
              <button
                key={mealType}
                className={`filter-pill ${selectedFilters.mealType?.includes(mealType) ? 'active' : ''}`}
                onClick={() => handleFilterToggle('mealType', mealType)}
              >
                {mealType}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dietary Filters */}
      <div className="filter-section">
        <button 
          className="filter-section-header"
          onClick={() => toggleSection('dietary')}
          aria-expanded={expandedSections.dietary}
        >
          <span>By Dietary</span>
          {expandedSections.dietary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {expandedSections.dietary && (
          <div className="filter-pills">
            {dietary.map((diet) => (
              <button
                key={diet}
                className={`filter-pill ${selectedFilters.dietary?.includes(diet) ? 'active' : ''}`}
                onClick={() => handleFilterToggle('dietary', diet)}
              >
                {diet}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {(selectedFilters.recipeType?.length > 0 || selectedFilters.mealType?.length > 0 || selectedFilters.dietary?.length > 0) && (
        <div className="clear-filters">
          <button 
            className="clear-filters-btn"
            onClick={() => {
              onFilterChange('recipeType', []);
              onFilterChange('mealType', []);
              onFilterChange('dietary', []);
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Sidebar Ad */}
      {shouldShowAds(window.location.pathname) && (
        <div className="sidebar-ad">
          <AdComponent
            adSlot={ADSENSE_CONFIG.placements.sidebar.slot}
            adFormat={ADSENSE_CONFIG.placements.sidebar.format}
            className={ADSENSE_CONFIG.placements.sidebar.className}
            responsive={ADSENSE_CONFIG.placements.sidebar.responsive}
            testMode={ADSENSE_CONFIG.testMode}
          />
        </div>
      )}
    </aside>
  );
};

export default FilterSidebar; 