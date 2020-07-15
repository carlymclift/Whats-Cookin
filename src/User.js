class User {
  constructor(id, name, pantry) {
    this.id = id === Number(id) ? id : undefined;
    this.name = name ? name : undefined;
    this.pantry = pantry instanceof Array ? pantry : undefined;
    this.favRecipes = [];
    this.recipesToCook = [];
  }

  updateSavedRecipes(savedList, recipe) {
    if (!savedList.includes(recipe)) {
      savedList.push(recipe);
    } else {
      let recipeIndex = savedList.indexOf(recipe);
      savedList.splice(recipeIndex, 1);
    }
  }

  filterSavedRecipes(savedList, tag) {
    return savedList.filter(recipe => {
      return recipe.tags.includes(tag);
    }); 
  }

  searchSavedRecipes(searchItem) {
    let searchList = [];
    this.favRecipes.forEach(recipe => {
      recipe.ingredients.filter(ingredient => {
        if (ingredient.name.includes(searchItem)) {
          searchList.push(recipe);
        } 
      });
      this.favRecipes.filter(recipe => {
        if (recipe.name.includes(searchItem)) {
          searchList.push(recipe);
        }
      });
    });
    return searchList;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}