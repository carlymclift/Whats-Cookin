const recipeArea = document.querySelector('.card-container');
const pantryArea = document.querySelector('.pantry');
// const saveRecipeButton = document.querySelector('.save-recipe-button')
// const cardArea = document.querySelector('.card-container');

// saveRecipeButton.addEventListener('click', addRecipeToFavorites)

// cardArea.addEventListener('click', filterCardConditions())

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
        <section class="card-buttons">
          <button id='save-recipe-button' class='save-recipe-button'></button>
          <button id='add-recipe-button' class='add-recipe-button'></button>
        </section>
        <h3>${recipe.name}</h3>
        <input type="image" src=${recipe.image} name="recipe" class="recipe-image" id="recipe-image" />
      </div>
    </section>`
})
}

// const filterCardConditions = () => {
//   if (event.target.classList.contains('save-recipe-button')) {
//     addToFavorites();
//   } else if (event.target.classList.contains('add-recipe-button')) {
//     addMeal();
//   } else if (event.target.classList.contains('recipe-image')) {
//     displayDirections();
//   }
// }

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
    newRecipe.addIngredientName();
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
}
recipeArea.addEventListener('click', addRecipeToFavorites)