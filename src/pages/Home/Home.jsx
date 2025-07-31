import React, { useState, useMemo } from 'react';
import Header from '../../components/Header/Header';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import AdComponent from '../../components/Ads/AdComponent';
import { recipes } from '../../data/recipes';
import { ADSENSE_CONFIG, shouldShowAds } from '../../config/adsConfig';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    recipeType: [],
    mealType: [],
    dietary: []
  });

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.categories.some(category => 
          category.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Recipe type filter
      const matchesRecipeType = selectedFilters.recipeType.length === 0 ||
        selectedFilters.recipeType.some(filter => {
          switch(filter) {
            case "Everything Telugu":
              return recipe.categories.includes("South Indian") || 
                     recipe.title.toLowerCase().includes("telugu") ||
                     recipe.tags.some(tag => tag.includes("telugu"));
            case "Pan Indian":
              return recipe.categories.includes("North Indian") || 
                     recipe.categories.includes("South Indian") ||
                     recipe.tags.some(tag => tag.includes("indian"));
            case "World Cuisine":
              return recipe.categories.includes("Fusion") || 
                     recipe.title.toLowerCase().includes("fusion") ||
                     recipe.tags.some(tag => tag.includes("fusion"));
            case "Everything Bread":
              return recipe.categories.includes("Bread") || 
                     recipe.title.toLowerCase().includes("bread") ||
                     recipe.title.toLowerCase().includes("naan") ||
                     recipe.tags.some(tag => tag.includes("bread"));
            default:
              return false;
          }
        });

      // Meal type filter
      const matchesMealType = selectedFilters.mealType.length === 0 ||
        selectedFilters.mealType.some(filter => 
          recipe.categories.includes(filter)
        );

      // Dietary filter
      const matchesDietary = selectedFilters.dietary.length === 0 ||
        selectedFilters.dietary.some(filter => 
          recipe.categories.includes(filter)
        );

      return matchesSearch && matchesRecipeType && matchesMealType && matchesDietary;
    });
  }, [searchTerm, selectedFilters]);

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  return (
    <div className="home">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="content-grid">
            <FilterSidebar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
            
            <div className="recipes-section">
              <div className="recipes-header">
                <h2 className="recipes-title">
                  {searchTerm || selectedFilters.recipeType.length > 0 || selectedFilters.mealType.length > 0 || selectedFilters.dietary.length > 0
                    ? `Found ${filteredRecipes.length} recipe${filteredRecipes.length !== 1 ? 's' : ''}`
                    : 'All Recipes'
                  }
                </h2>
                {filteredRecipes.length === 0 && (
                  <p className="no-results">
                    No recipes found. Try adjusting your search or filters.
                  </p>
                )}
              </div>
              
              <div className="recipes-grid">
                {filteredRecipes.map((recipe, index) => (
                  <React.Fragment key={index}>
                    <RecipeCard recipe={recipe} />
                    {/* Show ad after every 3 recipes */}
                    {shouldShowAds(window.location.pathname) && 
                     (index + 1) % ADSENSE_CONFIG.rules.showAfterRecipes === 0 && 
                     index < filteredRecipes.length - 1 && (
                      <div className="ad-between-recipes">
                        <AdComponent
                          adSlot={ADSENSE_CONFIG.placements.betweenRecipes.slot}
                          adFormat={ADSENSE_CONFIG.placements.betweenRecipes.format}
                          className={ADSENSE_CONFIG.placements.betweenRecipes.className}
                          responsive={ADSENSE_CONFIG.placements.betweenRecipes.responsive}
                          testMode={ADSENSE_CONFIG.testMode}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home; 