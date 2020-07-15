const chai = require('chai');
const expect = chai.expect;
const Recipe = require('../src/Recipe');
const recipeSample = require('../test/recipeSampleData');
const ingredientSample = require('../test/ingredientsSampleData');

describe('Recipe', () => {
  let recipe;

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
    expect(recipe.name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
    expect(recipe.instructions).to.deep.equal(recipeSample[0].instructions);
    expect(recipe.tags).to.deep.equal(recipeSample[0].tags);
    expect(recipe.ingredients).to.deep.equal(recipeSample[0].ingredients);
    expect(recipe.ingredientsData).to.deep.equal(ingredientSample);
    expect(recipe.image).to.deep.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg');
  })

  it('should add the indgredient name to each ingredient in the recipe', () => {
    expect(recipe.addIngredientName()).to.deep.equal([
      {
        id: 20081,
        quantity: { amount: 1.5, unit: 'c' },
        name: 'wheat flour'
      },
      {
        id: 18372,
        quantity: { amount: 0.5, unit: 'tsp' },
        name: 'bicarbonate of soda'
      },
      { id: 1123, quantity: { amount: 1, unit: 'large' }, name: 'eggs' }
    ]);
  })

  it('Should return the costs of its ingredients', () => {
    expect(recipe.getCost()).to.equal(9.76);
  })

  it('Should return the instructions for recipe', () => {
    expect(recipe.getInstructions()).to.deep.equal([
      {
        "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        "number": 1
      },
      {
        "instruction": "Add egg and vanilla and mix until combined.",
        "number": 2
      },
    ]);
  });
}) 