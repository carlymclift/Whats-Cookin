// let ingredients = require('../data/ingredients');

class Pantry {
  constructor(userPantry) {
    this.usersIngredients = userPantry // user.pantry
    this.ingredientsNeeded = [];
  }

  checkPantry(recipe) {

    // Access recipe ingredients and amounts
    // Compare with user ingredients and amounts
    // if ingredient is found in user pantry -- then compare amount
    //// if recipe amount is greater than user amount, add the ingredient and the amount needed to make up the difference to an object (grocery list)
    // if ingredient is not found in user pantry then add the ingredient and the amount to an object (grocery list)

    // access recipe ingredients: recipe.ingredients
    // { id: 20081, quantity: { amount: 1.5, unit: 'c' } },

    // access user ingredients: this.usersIngredients
    /* users ingredients: [
    { ingredient: 11477, amount: 4 },
    { ingredient: 11297, amount: 4 },
    { ingredient: 1082047, amount: 10 },
    { ingredient: 11456, amount: 5 },
    { ingredient: 4895, amount: 6 },
  */

  }

  

}




if (typeof module !== 'undefined') {
  module.exports = Pantry;
}