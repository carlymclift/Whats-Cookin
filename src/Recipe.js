class Recipe {
  constructor(recipe, ingredientsData) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients
    this.ingredientsData = ingredientsData;
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
    return costCounter / 100
  }

  getInstructions() {
    return this.instructions;
  }
}


if (typeof module !== 'undefined') {
  module.exports = Recipe;
}