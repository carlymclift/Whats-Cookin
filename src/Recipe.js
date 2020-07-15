class Recipe {
  constructor(recipe, ingredientsData) {
    this.id = recipe.id === Number(recipe.id) ? recipe.id : undefined;
    this.name = recipe.name ? recipe.name : undefined;
    this.instructions = recipe.instructions instanceof Array ? recipe.instructions : undefined;
    this.tags = recipe.tags;
    this.image = recipe.image ? recipe.image : undefined;
    this.ingredients = recipe.ingredients instanceof Array ? 
      recipe.ingredients : undefined;
    this.ingredientsData = ingredientsData;
  }

  addIngredientName() { 
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.forEach(item => {
        if (item.id === ingredient.id) {
          ingredient.name = item.name;
        }
      })
    })
    return this.ingredients;
  }

  getCost() { 
    let costCounter = 0;
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.find(item => {
        if (item.id === ingredient.id) {
          costCounter += item.estimatedCostInCents * ingredient.quantity.amount;
        }
      })
    })
    const recipeCost = costCounter / 100;
    return recipeCost;
  }

  getInstructions() {
    return this.instructions;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}