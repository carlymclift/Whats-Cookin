const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
const userSample = require('../test/userSampleData');
const userPantry = userSample[0].pantry;
const recipeSample = require('../test/recipeSampleData');


describe('Pantry', () => {
  let pantry, recipe

  beforeEach(() => {
    pantry = new Pantry(userPantry);
    recipe = recipeSample[0];
  })

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  })

  it('Should be an instance of Pantry', () => {
    expect(pantry).to.be.an.instanceOf(Pantry);
  })

  it('Should return pantry', () => {
    expect(pantry.usersIngredients).to.deep.equal([
      {
        "ingredient": 11477,
        "amount": 4
      },
      {
        "ingredient": 11297,
        "amount": 4
      },
      {
        "ingredient": 1082047,
        "amount": 10
      },
      {
        "ingredient": 11456,
        "amount": 5
      },
      {
        "ingredient": 4895,
        "amount": 6
      },
      { // Added additional ingredient for testing
        "ingredient": 20081,
        "amount": 6
      },
    ])
  })

  it('Should determine whether user has required ingredients for a given  recipe', () => {
    expect(pantry.checkPantry(recipe)).to.equal();

  })


})