// const usersData = require("../data/users");

// const ingredientsData = require("../data/ingredients");

// const ingredientsData = require("../data/ingredients");

const recipeArea = document.querySelector('.card-container')
const pantryArea = document.querySelector('.pantry')

let user;

const pickRandomUser = () => {
  let randomUser = Math.floor((Math.random() * 49));
  user = new User(usersData[randomUser].id, usersData[randomUser].name, usersData[randomUser].pantry, )
  const welcomeMessage = document.querySelector('.welcome-user');
  welcomeMessage.innerHTML = `Welcome ${user.name}!`;
  return user;
}

const populateCards = () => {
  recipeArea.innerHTML = ''
  recipeData.forEach(recipe => {
    recipeArea.innerHTML += `
    <section class='card-container'>
    <div id='595736' class='fixed-recipe-card'>
            <img class='recipe-image' src=${recipe.image} alt='Photo of Loaded Chocolate Chip Pudding Cookie Cups'>
            <h3>${recipe.name}</h3>
             <button id='save-recipe-button' class='save-recipe-button'>
              <span class="save-recipe-button-text">Save recipe</span>
              <img class='save-image' src='https://image.flaticon.com/icons/svg/942/942176.svg' alt='Save recipe button'>
            </button>
          </div>
          </section>`
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
    console.log('new pantry', newPantry);
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

const loadWindow = () => {
  pickRandomUser()
  populateCards()
  translatePantry(user)
  // let recipe = new Recipe()
}

window.onload = loadWindow()