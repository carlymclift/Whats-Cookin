const recipeArea = document.querySelector('.card-container');
const pantryArea = document.querySelector('.pantry');
const mainSection = document.querySelector('.main-section');
const fullCenterSec = document.querySelector('.column-center');
const navigationArea = document.querySelector('.navigation-area');
const shoppingListArea = document.querySelector('.shopping-list-area');
const rightColumn = document.querySelector('.pantry-sec');
const pantryHeader = document.querySelector('.pantry-header');
const centerMain = document.querySelector('.center-main');
const recipeFilterButtons = document.querySelector('.recipe-choices');
const shoppingListButton = document.querySelector('.shopping-list-button');
const pantryButton = document.querySelector('.pantry-button')

let user, pantry;
let shoppingList = [];

const pickRandomUser = () => {
  let randomUser = Math.floor((Math.random() * 49));
  user = new User(usersData[randomUser].id, usersData[randomUser].name, usersData[randomUser].pantry, )
  const welcomeMessage = document.querySelector('.welcome-user');
  welcomeMessage.innerHTML = `Welcome, ${user.name}!`;
  return user;
}

const populateCards = (dataToDisplay) => {
  recipeArea.innerHTML = ''
  recipeArea.classList.add('card-container');
  dataToDisplay.forEach(recipe => {
    recipeArea.innerHTML += `
    <section class='card-container'>
      <div class='fixed-recipe-card' data-id=${recipe.id}>
          <button id='save-recipe-button' class='save${recipe.id} save-recipe-button'></button>
          <button id='add-recipe-button' class='add-recipe-button'></button>
        <h3>${recipe.name}</h3>
        <input type="image" src=${recipe.image} alt='Photo of ${recipe.name} recipe' name="recipe" class="recipe-image" id="recipe-image" />
      </div>
    </section>`
})
heartFavedCards()
}

const heartFavedCards = () => {
  if(user.favRecipes.length) {
    user.favRecipes.forEach(recipe => {
      document.querySelector(`.save${recipe.id}`).classList.add('save-active-button')
    })
  }
}

const updateIcons = (target) => {
  if (!target.classList.contains('save-active-button')) {
    target.classList.add('save-active-button')
  } else if (target.classList.contains('save-active-button')) {
    target.classList.remove('save-active-button')
  }
}

const displayDirections = (event) => {
  let selectedRecipe = recipeData.find(recipe => {
    if (Number(event.target.parentNode.dataset.id) === recipe.id) {
      console.log(recipe)
      return recipe
    }
  })

  recipeArea.innerHTML = ''
  recipeArea.classList.remove('card-container');
      recipeArea.innerHTML = `
      <div class="recipe-display">
    <h3 class="recipe-heading">${selectedRecipe.name}</h3>
    <img src=${selectedRecipe.image} alt="Selected Recipe">
    <h2>You will need:</h2> <div class="ingredients"></div>
    <h2>Directions:</h2> <div class="instructions"></div>
    </div>
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
    populateIngredients(newPantry)
    return newPantry
  }, [])
}

const populateIngredients = (list) => {
  pantryArea.innerHTML = '';
  pantryHeader.innerText = 'Shopping List'
  list.forEach(item => {
    pantryArea.innerHTML += `
    <div class="pantry id="pantry">
    <p>${item.name}</p>
    </div>`
  })
}

const populateShoppingList = (list) => {
  pantryArea.innerHTML = '';
  pantryHeader.innerText = 'Shopping List'

  var newArray = [].concat.apply([], list);
  console.log('newArray', newArray)

  newArray.forEach(item => {
    pantryArea.innerHTML += `
    <div class="pantry id="pantry">
    <p>${item.name}</p>
    </div>`
  })
  return newArray
}

const populateRecipes = () => {
  recipeData.map(recipe => {
   let newRecipe = new Recipe(recipe, ingredientsData); 
    newRecipe.addIngredientName(); // delete if we don't use this
    return newRecipe;
  });
}

const loadWindow = () => {
  pickRandomUser()
  populateCards(recipeData)
  translatePantry(user)
  populateRecipes();
}

window.onload = loadWindow()

const saveRecipe = (event, listToUpdate) => {
  let targetRecipe = recipeData.find(recipe => {
    if (recipe.id ===
      Number(event.target.parentNode.dataset.id)) {
      console.log('recipe ID:', recipe.id)
      return recipe;
    }
  })
  console.log(targetRecipe)
  updateIcons(event.target)
  user.updateSavedRecipes(listToUpdate, targetRecipe);
}

const filterCardConditions = (event) => {
  if (event.target.classList.contains('save-recipe-button')) {
    saveRecipe(event, user.favRecipes)
  } else if (event.target.classList.contains('add-recipe-button')) {
    findRecipe(event)
  } else if (event.target.classList.contains('recipe-image')) {
    displayDirections(event);
  }
}

const findRecipe = (event) => {
  let selectedRecipe = recipeData.find(recipe => recipe.id === Number(event.target.parentNode.dataset.id))
  pantry = new Pantry(user.pantry)
  pantry.checkPantry(selectedRecipe);
  let test = pantry.checkPantry(selectedRecipe)
  if(!pantry.ingredientsNeeded) {
    alert('You have the ingredients!')
    saveRecipe(event, user.recipesToCook)
  } else {
    alert('You don\'t have enough ingredients for this recipe. The needed ingredients have been added to your shopping list')
  }
  shoppingList.push(pantry.ingredientsNeeded)
}

const showSavedRecipesButton = document.querySelector('.show-saved-button');
const homeButton = document.querySelector('.home-button');
const myMealsButton = document.querySelector('.my-meals-button');
// const shoppingListButton = document.querySelector('.shopping-list-button');

const changeDisplay = (event) => {
  if (event.target.classList.contains('show-saved-button')) {
    populateCards(user.favRecipes);
  } 
  if (event.target.classList.contains('my-meals-button')) {
    populateCards(user.recipesToCook);
  } 
  if (event.target.classList.contains('home-button')) {
    populateCards(recipeData);
  } 
}

const displayShoppingList = () => {
  pantry = new Pantry(user.pantry)
    console.log('shopping', shoppingList);
    populateShoppingList(shoppingList);
}

const filterRecipeButtons = (event) => {
  if (event.target.classList.contains('appetizers')) {
    let filteredRecipes = user.filterSavedRecipes(recipeData, 'appetizer')
    populateCards(filteredRecipes)
  } 
  if (event.target.classList.contains('snacks')) {
    let filteredRecipes = user.filterSavedRecipes(recipeData, 'snack')
    populateCards(filteredRecipes)
  } 
  if (event.target.classList.contains('salads')) {
    let filteredRecipes = user.filterSavedRecipes(recipeData, 'salad')
    populateCards(filteredRecipes)
  } 
  if (event.target.classList.contains('breakfast')) {
    let filteredRecipes = user.filterSavedRecipes(recipeData, 'breakfast')
    populateCards(filteredRecipes)
  } 
  if (event.target.classList.contains('side-dish')) {
    let filteredRecipes = user.filterSavedRecipes(recipeData, 'side dish')
    populateCards(filteredRecipes)
  } 
}

recipeArea.addEventListener('click', filterCardConditions)
navigationArea.addEventListener('click', changeDisplay)
recipeFilterButtons.addEventListener('click', filterRecipeButtons)
shoppingListButton.addEventListener('click', displayShoppingList)
pantryButton.addEventListener('click', () => translatePantry(user))

