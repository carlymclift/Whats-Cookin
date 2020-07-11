const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const recipeSample = require('../test/recipeSampleData');
const userSample = require('../test/userSampleData');
const ingredientSample = require('../test/ingredientsSampleData');

describe('User', () => {
  let user, recipe;

  beforeEach(() => {
    user = new User(userSample[0].id, userSample[0].name, userSample[0].pantry, ingredientSample);
    // recipe = 'Loaded Chocolate Chip Pudding Cookie Cups';
    recipe = recipeSample;
  })

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  })

  it('Should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  })

  //   it('Should throw an error if instance of user has no arguements', () => {
  //     expect(() => { new User() }).to.throw(Error);
  //   })

  it('Should hold on to data from the user', () => {
    expect(user.id).to.equal(1)
    expect(user.name).to.equal('Saige O\'Kon')
    expect(user.pantry).to.deep.equal(userSample[0].pantry)
    expect(user.favRecipes).to.deep.equal([]);
    expect(user.recipesToCook).to.deep.equal([]);
  })

  it('Should be able to update favorite list', () => {
    expect(user.favRecipes).to.deep.equal([]);
    user.updateSavedRecipes(user.favRecipes, recipe[0]);
    expect(user.favRecipes).to.deep.equal([recipe[0]]);
    user.updateSavedRecipes(user.favRecipes, recipe[0]);
    expect(user.favRecipes).to.deep.equal([]);
  })

  it('Should be able to update recipes to cook', () => {
    expect(user.recipesToCook).to.deep.equal([]);
    user.updateSavedRecipes(user.recipesToCook, recipe[0]);
    expect(user.recipesToCook).to.deep.equal([recipe[0]]);
    user.updateSavedRecipes(user.recipesToCook, recipe[0]);
    expect(user.recipesToCook).to.deep.equal([]);
  })

  it('Should be able to filter favorite recipes by tag', () => {
    user.updateSavedRecipes(user.favRecipes, recipe[0]);
    expect(user.filterSavedRecipes(user.favRecipes, "snack")).to.deep.equal([recipe[0]]);
  })

  it('Should be able to filter recipes to cook by tag', () => {
    user.updateSavedRecipes(user.recipesToCook, recipe[0]);
    expect(user.filterSavedRecipes(user.recipesToCook, 'snack')).to.deep.equal([recipe[0]]);
  })

  it('Should be able to search saved recipes by name or ingredient', () => {
    user.updateSavedRecipes(user.favRecipes, recipe[0]);
    expect(user.searchSaved('Chip')).to.deep.equal([recipe[0]]);
    expect(user.searchSaved('wheat flour')).to.deep.equal([recipe[0]]);
  })

})
