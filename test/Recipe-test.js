const chai = require('chai');
const expect = chai.expect;
const Recipe = require('../src/Recipe');
// const User = require('../src/User');
const recipeSample = require('../test/recipeSampleData');
// const userSample = require('../test/userSampleData');
const ingredientSample = require('../test/ingredientsSampleData');


describe('Recipe', () => {
  let recipe

  beforeEach(() => {
    recipe = new Recipe(recipeSample[0], ingredientSample);
  })

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  })

  it('Should be an instance of Recipe', () => {
    expect(recipe).to.be.an.instanceOf(Recipe);
  })

  it('Should hold on to data from the recipe', () => {
    expect(recipe.id).to.equal(595736);
    expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups")
    expect(recipe.instructions).to.deep.equal(recipeSample[0].instructions)
    expect(recipe.tags).to.deep.equal(recipeSample[0].tags);
    expect(recipe.ingredientsData).to.deep.equal(ingredientSample)
    expect(recipe.image).to.deep.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
  })

  it('Should return the costs of its ingredients', () => {
    expect(recipe.getCost()).to.equal(976);

  })



})