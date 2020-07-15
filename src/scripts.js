const recipeArea = document.querySelector('.card-container');
const pantryArea = document.querySelector('.pantry');
const mainSection = document.querySelector('.main-section');
const fullCenterSec = document.querySelector('.column-center');
const navigationArea = document.querySelector('.navigation-area');
const shoppingListArea = document.querySelector('.shopping-list-area');

let user;

const pickRandomUser = () => {
  let randomUser = Math.floor((Math.random() * 49));
  user = new User(usersData[randomUser].id, usersData[randomUser].name, usersData[randomUser].pantry, )
  const welcomeMessage = document.querySelector('.welcome-user');
  welcomeMessage.innerHTML = `Welcome, ${user.name}!`;
  return user;
}

const populateCards = (dataToDisplay) => {
  recipeArea.innerHTML = ''
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
    return newRecipe;
  });
}

const displayShoppingList = () => {
  shoppingListArea.classList.remove('hidden');
  recipeArea.innerHTML = '';
  let shoppingList = pantry.checkPantry()
  shoppingList.forEach(ingredient => {
    recipeArea.innerHTML = `
     <section class='shopping-list-area'>
        <h2 class="shopping-list-header">Your Shopping List:</h2>
        <ul class='shopping-list'>
          <li>${ingredient.id}</li>
        </ul>
      </section>`
      return shoppingList;
  })
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

const recipeImage = document.querySelector('.recipe-image');
const saveRecipeButton = document.querySelector('.save-recipe-button');
const addRecipeButton = document.querySelector('.add-recipe-button');

const filterCardConditions = (event) => {
  if (event.target.classList.contains('save-recipe-button')) {
    saveRecipe(event, user.favRecipes)
  } else if (event.target.classList.contains('add-recipe-button')) {
    findRecipe(event)
    // saveRecipe(event, user.recipesToCook)
  } else if (event.target.classList.contains('recipe-image')) {
    displayDirections(event);
  }
}

const findRecipe = (event) => {
  let selectedRecipe = recipeData.find(recipe => recipe.id === Number(event.target.parentNode.dataset.id))
  console.log(selectedRecipe)
  let pantry = new Pantry(user.pantry)
  let test = pantry.checkPantry(selectedRecipe)
  if(!test.length) {
    alert('You have the ingredients!')
    saveRecipe(event, user.recipesToCook)
  } else {
    alert('You don\'t have enough ingredients, check your shopping list for update!')
  }
  console.log(test)
}

const showSavedRecipesButton = document.querySelector('.show-saved-button');
const homeButton = document.querySelector('.home-button');
const myMealsButton = document.querySelector('.my-meals-button');
const shoppingListButton = document.querySelector('.shopping-list-button');

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
  if (event.target.classList.contains('shopping-list-button')) {
    displayShoppingList();
  }
}

recipeArea.addEventListener('click', filterCardConditions)
navigationArea.addEventListener('click', changeDisplay)



