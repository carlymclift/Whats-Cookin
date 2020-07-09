let ingredients = require('../data/ingredients');

class User {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favRecipes = [];
    this.recipesToCook = [];
    this.shoppinglist = [];
  }

  updateSavedRecipes(savedList, recipe) {
    if (!savedList.includes(recipe)) {
      savedList.push(recipe)
    } else {
      let recipeIndex = savedList.indexOf(recipe);
      savedList.splice(recipeIndex);
    }
  }

  filterSavedRecipes(savedList, tag) {
    return savedList.filter(recipe => {
      return recipe.tags.includes(tag);
    }); 
  }

  searchSaved(searchItem) {
    let ingredientId = null;
    ingredients.forEach((ingredient) => {
      if (searchItem.includes(ingredient.name)) {
        ingredientId = ingredient.id;
      }
    });
    let searchList = [];
    this.favRecipes.forEach(recipe => {
      recipe.ingredients.forEach(item => {
        if (ingredientId === item.id) {
          searchList.push(recipe)
        }
      });
      this.favRecipes.filter(recipe => {
        if (recipe.name.includes(searchItem)) {
          searchList.push(recipe)
        }
      });
    });
    return searchList;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}