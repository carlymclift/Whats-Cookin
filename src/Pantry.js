class Pantry {
  constructor(userPantry) {
    this.usersIngredients = userPantry // user.pantry
    this.ingredientsNeeded = [];
  }

  // translateUserPantry() {
  //   return this.usersIngredients.reduce((newPantry, ingredient) => {
  //     let translatedPantry = {};
  //     translatedPantry['id'] = ingredient.ingredient;
  //     translatedPantry['amount'] = ingredient.amount
  //     newPantry.push(translatedPantry)
  //     return newPantry
  //   }, [])
  // }

  checkPantry(recipe) {
    recipe.ingredients.forEach(recipeIngredient=> {
      let userIngredient = this.usersIngredients.find(userIng => recipeIngredient.id === userIng.ingredient);

      if (!userIngredient) {
        this.ingredientsNeeded.push({
          id: recipeIngredient.id,
          amount: recipeIngredient.quantity.amount,
          unit: recipeIngredient.quantity.unit
        });
      } else if (userIngredient.amount < recipeIngredient.quantity.amount) {
        this.ingredientsNeeded.push({
          id: recipeIngredient.id,
          amount: recipeIngredient.quantity.amount - userIngredient.amount,
          unit: recipeIngredient.quantity.unit
        });
      }
    });
    return this.ingredientsNeeded;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}