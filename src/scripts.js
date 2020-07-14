const recipeArea = document.querySelector('.card-container');
const pantryArea = document.querySelector('.pantry');
const showSavedRecipesButton = document.querySelector('.show-saved-button');
const homeButton = document.querySelector('.home-button');
const mainSection = document.querySelector('.main-section')
const fullCenterSec = document.querySelector('.column-center');

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

const displayDirections = (event) => {
  let selectedRecipe = recipeData.find(recipe => {
    if (Number(event.target.parentNode.dataset.id) === recipe.id) {
      console.log(recipe)
      return recipe
    }
  })

  fullCenterSec.innerHTML = ''
      fullCenterSec.innerHTML = `
    <h3 class="recipe-heading">${selectedRecipe.name}</h3>
    <img src=${selectedRecipe.image} alt="Selected Recipe">
    <h2>You will need:</h2> <div class="ingredients"></div>
    <h2>Directions:</h2> <div class="instructions"></div>
  `

  displayIngAndInstructions(selectedRecipe)
  return selectedRecipe;
}

const displayIngAndInstructions = (selectedRecipe) => {
  let ingredientSec = document.querySelector('.ingredients')
  let instructionSec = document.querySelector('.instructions')

  selectedRecipe.ingredients.forEach(ingredient => {
    ingredientSec.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredient.name}
      </li></ul>`)
  })

  selectedRecipe.instructions.forEach(instruction => {
    instructionSec.insertAdjacentHTML('afterbegin', `<ul><li>
    ${instruction.instruction}
      </li></ul>`)
  })
}

// NAVIGATION COLUMN EVENT LISTENERS (NEED TO PUT IN ONE FUNCTION)
// showSavedRecipesButton.addEventListener('click', displaySavedRecipes)
// homeButton.addEventListener('click', populateCards)

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
    // console.log(newRecipe);
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
const saveRecipe = (event, listToUpdate) => {
  let targetRecipe = recipeData.find(recipe => {
    if (recipe.id ===
      Number(event.target.parentNode.dataset.id)) {
      console.log('recipe ID:', recipe.id)
      return recipe;
    }
  })
  console.log(targetRecipe)
  user.updateSavedRecipes(listToUpdate, targetRecipe);
}

const recipeImage = document.querySelector('.recipe-image');
const saveRecipeButton = document.querySelector('.save-recipe-button');
const addRecipeButton = document.querySelector('.add-recipe-button');

const filterCardConditions = (event) => {
  if (event.target.classList.contains('save-recipe-button')) {
    saveRecipe(event, user.favRecipes)
  } else if (event.target.classList.contains('add-recipe-button')) {
    saveRecipe(event, user.recipesToCook)
  } else if (event.target.classList.contains('recipe-image')) {
    displayDirections(event);
  }
}

showSavedRecipesButton.addEventListener('click', displaySavedRecipes)
homeButton.addEventListener('click', populateCards)
recipeArea.addEventListener('click', filterCardConditions)



