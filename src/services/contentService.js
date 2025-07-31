// Content Management Service
// This service handles recipe data and can be easily extended for CMS integration

import { recipes, categories, mealTypes, dietary } from '../data/recipes';

class ContentService {
  // Get all recipes
  getAllRecipes() {
    return recipes;
  }

  // Get recipe by ID
  getRecipeById(id) {
    return recipes.find(recipe => recipe.id === id);
  }

  // Get recipes by category
  getRecipesByCategory(category) {
    return recipes.filter(recipe => 
      recipe.categories.includes(category) || 
      recipe.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
    );
  }

  // Get recipes by recipe type (Everything Telugu, Pan Indian, etc.)
  getRecipesByType(recipeType) {
    return recipes.filter(recipe => {
      switch(recipeType) {
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
  }

  // Search recipes
  searchRecipes(query) {
    const searchTerm = query.toLowerCase();
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.categories.some(category => 
        category.toLowerCase().includes(searchTerm)
      ) ||
      recipe.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm)
      )
    );
  }

  // Get all categories
  getAllCategories() {
    return categories;
  }

  // Get all meal types
  getAllMealTypes() {
    return mealTypes;
  }

  // Get all dietary options
  getAllDietary() {
    return dietary;
  }

  // Get recipe types (for filtering)
  getRecipeTypes() {
    return [
      "Everything Telugu",
      "Pan Indian", 
      "World Cuisine",
      "Everything Bread"
    ];
  }

  // Future: CMS Integration Methods
  // These methods can be implemented when you add a CMS

  async fetchRecipesFromCMS() {
    // Future implementation for CMS integration
    // Example with Contentful, Strapi, or AWS Amplify Studio
    try {
      // const response = await fetch('your-cms-api-endpoint');
      // const data = await response.json();
      // return data.recipes;
      return recipes; // Fallback to static data for now
    } catch (error) {
      console.error('Error fetching from CMS:', error);
      return recipes; // Fallback to static data
    }
  }

  async createRecipe(recipeData) {
    // Future implementation for creating recipes via CMS
    console.log('Creating recipe:', recipeData);
    // This would typically make an API call to your CMS
  }

  async updateRecipe(id, recipeData) {
    // Future implementation for updating recipes via CMS
    console.log('Updating recipe:', id, recipeData);
    // This would typically make an API call to your CMS
  }

  async deleteRecipe(id) {
    // Future implementation for deleting recipes via CMS
    console.log('Deleting recipe:', id);
    // This would typically make an API call to your CMS
  }
}

export default new ContentService(); 