import React, { useState, useEffect } from 'react';
import contentService from '../../services/contentService';
import './AdminPanel.css';

const AdminPanel = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    image: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy',
    tags: []
  });

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    const allRecipes = contentService.getAllRecipes();
    setRecipes(allRecipes);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingRecipe) {
      await contentService.updateRecipe(editingRecipe.id, formData);
    } else {
      await contentService.createRecipe({
        ...formData,
        id: Date.now() // Simple ID generation
      });
    }
    
    loadRecipes();
    resetForm();
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      title: recipe.title,
      description: recipe.description,
      categories: recipe.categories,
      image: recipe.image,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      tags: recipe.tags
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      await contentService.deleteRecipe(id);
      loadRecipes();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      categories: [],
      image: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      difficulty: 'Easy',
      tags: []
    });
    setEditingRecipe(null);
    setShowForm(false);
  };

  const availableCategories = contentService.getAllCategories();
  const availableMealTypes = contentService.getAllMealTypes();

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Content Management</h1>
        <button 
          className="add-recipe-btn"
          onClick={() => setShowForm(true)}
        >
          Add New Recipe
        </button>
      </div>

      {showForm && (
        <div className="recipe-form-overlay">
          <div className="recipe-form">
            <div className="form-header">
              <h2>{editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Categories (comma-separated)</label>
                <input
                  type="text"
                  value={formData.categories.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'categories')}
                  placeholder="Breakfast, South Indian, Vegetarian"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prep Time</label>
                  <input
                    type="text"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleInputChange}
                    placeholder="30 min"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cook Time</label>
                  <input
                    type="text"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleInputChange}
                    placeholder="45 min"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Servings</label>
                  <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'tags')}
                  placeholder="indian, curry, vegetarian"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
                </button>
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="recipes-list">
        <h3>Current Recipes ({recipes.length})</h3>
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <div key={recipe.id} className="recipe-item">
              <img src={recipe.image} alt={recipe.title} className="recipe-thumbnail" />
              <div className="recipe-info">
                <h4>{recipe.title}</h4>
                <p>{recipe.description.substring(0, 100)}...</p>
                <div className="recipe-meta">
                  <span>{recipe.prepTime} + {recipe.cookTime}</span>
                  <span>{recipe.servings} servings</span>
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="recipe-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(recipe)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 