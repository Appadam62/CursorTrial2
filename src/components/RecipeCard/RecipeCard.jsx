import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const getDifficultyDots = (difficulty) => {
    const dots = [];
    const maxDots = 3;
    const activeDots = difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 2 : 3;
    
    for (let i = 0; i < maxDots; i++) {
      dots.push(
        <span 
          key={i} 
          className={`difficulty-dot ${i < activeDots ? 'active' : ''}`}
        />
      );
    }
    return dots;
  };

  return (
    <article className="recipe-card">
      <div className="recipe-image-container">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="recipe-image"
        />
        <div className="recipe-overlay">
          <button className="view-recipe-btn">
            View Recipe
          </button>
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-categories">
          {recipe.categories.slice(0, 3).map((category, index) => (
            <span key={index} className="category-tag">
              {category}
            </span>
          ))}
        </div>
        
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <Clock className="meta-icon" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="meta-item">
            <Users className="meta-icon" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="meta-item">
            <Star className="meta-icon" />
            <div className="difficulty">
              {getDifficultyDots(recipe.difficulty)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard; 