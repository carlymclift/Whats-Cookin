const recipeArea = document.querySelector('.card-container');
const pantryArea = document.querySelector('.pantry');
const showSavedRecipesButton = document.querySelector('.show-saved-button');
const homeButton = document.querySelector('.home-button');
// const navigationArea = document.querySelector('.navigation-area')
// const saveRecipeButton = document.querySelector('.save-recipe-button');
// const addRecipeButton = document.querySelector('.add-recipe-button');

let user;

const pickRandomUser = () => {
  let randomUser = Math.floor((Math.random() * 49));
  user = new User(usersData[randomUser].id, usersData[randomUser].name, usersData[randomUser].pantry, )
  const welcomeMessage = document.querySelector('.welcome-user');
  welcomeMessage.innerHTML = `Welcome, ${user.name}!`;
  return user;
}

const populateCards = () => {
  recipeArea.innerHTML = ''
  recipeData.forEach(recipe => {
    recipeArea.innerHTML += `
    <section class='card-container'>
      <div class='fixed-recipe-card' data-id=${recipe.id}>
          <button id='save-recipe-button' class='save-recipe-button'></button>
          <button id='add-recipe-button' class='add-recipe-button'></button>
        <h3>${recipe.name}</h3>
        <input type="image" src=${recipe.image} alt='Photo of ${recipe.name} recipe' name="recipe" class="recipe-image" id="recipe-image" />
      </div>
    </section>`
})
}

// use function below to also display 'user.mealsToCook' 
const displaySavedRecipes = () => {
  recipeArea.innerHTML = ''
  // user.mealsToCook.forEach....
  user.favRecipes.forEach(recipe => {
    recipeArea.innerHTML += `
    <section class='card-container' >
      <div class='fixed-recipe-card' data-id=${recipe.id}>
          <button class='delete-recipe-button'></button>
          <button id='add-recipe-button' class='add-recipe-button'></button>
        <h3>${recipe.name}</h3>
        <input type="image" src=${recipe.image} alt='Photo of ${recipe.name} recipe' name="recipe" class="recipe-image" id="recipe-image" />
      </div>
    </section>`
  })
}

// NAVIGATION COLUMN EVENT LISTENERS (NEED TO PUT IN ONE FUNCTION)
showSavedRecipesButton.addEventListener('click', displaySavedRecipes)
homeButton.addEventListener('click', populateCards)

const translatePantry = (user) => {
  user.pantry.reduce((newPantry, item) => {
    ingredientsData.forEach(ingData => {
      let translatedPantry = {}
      if (ingData.id === item.ingredient) {
        
        translatedPantry['name'] = ingData.name
        translatedPantry['ingredient'] = item.ingredient
        translatedPantry['amount'] = item.amount
        newPantry.push(translatedPantry)
      }
    })
    populatePantry(newPantry)
    return newPantry
  }, [])
}

const populatePantry = (newPantry) => {
  pantryArea.innerHTML = '';
  newPantry.forEach(item => {
    pantryArea.innerHTML += `
    <div class="pantry id="pantry">
    <p>${item.name}</p>
    </div>`
  })
}

const populateRecipes = () => {
  recipeData.map(recipe => {
   let newRecipe = new Recipe(recipe, ingredientsData); 
    newRecipe.addIngredientName(); // delete if we don't use this
    console.log(newRecipe);
    return newRecipe;
  });
}

const loadWindow = () => {
  pickRandomUser()
  populateCards()
  translatePantry(user)
  populateRecipes();
}

window.onload = loadWindow()

// user function below to also add recipe to user.mealsToCook
const addRecipeToFavorites = (event) => {
  let targetRecipe = recipeData.find(recipe => {
    if (recipe.id ===
      Number(event.target.parentNode.dataset.id)) {
      console.log('recipe ID:', recipe.id)
      return recipe;
    }
  })
  console.log(targetRecipe)
  user.updateSavedRecipes(user.favRecipes, targetRecipe);
  // user.updateSavedRecipes([PASS IN favRecipes/mealsToCook], targetRecipe);
}

recipeArea.addEventListener('click', addRecipeToFavorites)


