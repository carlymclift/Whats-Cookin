const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
const Recipe = require('../src/Recipe');
const userSample = require('../test/userSampleData');
const userPantry = userSample[0].pantry;
const recipeSample = require('../test/recipeSampleData');
const ingredientSample = require('../test/ingredientsSampleData');

describe('Pantry', () => {
  let pantry, recipe;

  beforeEach(() => {
    pantry = new Pantry(userPantry);
    recipe = new Recipe(recipeSample[0], ingredientSample);
  })

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  })

  it('Should be an instance of Pantry', () => {
    expect(pantry).to.be.an.instanceOf(Pantry);
  })

  it('Should have the pantry of a user', () => {
    expect(pantry.usersIngredients).to.deep.equal([
      { "ingredient": 11477, "amount": 4 },
      { "ingredient": 11297, "amount": 4 },
      { "ingredient": 1082047, "amount": 10 },
      { "ingredient": 11456, "amount": 5 },
      { "ingredient": 4895, "amount": 6 },
      { "ingredient": 20081, "amount": 6 },
    ]);
  })

  it('Should determine whether user has required ingredients for a given  recipe', () => {
    recipe.addIngredientName()
    pantry.checkPantry(recipe);
    expect(pantry.ingredientsNeeded).to.deep.equal([
      { name: 'bicarbonate of soda', id: 18372, amount: 0.5, unit: 'tsp' },
      { name: 'eggs', id: 1123, amount: 1, unit: 'large' }
    ]);
  })
})