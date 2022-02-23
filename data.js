const recipesList = require("./data.json");
console.log(recipesList);

const list = () => {
  let listOfRecipes = recipesList.recipes.map((recipe) => {
    return recipe;
  });
  return [...listOfRecipes];
};

const find = (name) => {
  let recipe = recipesList.recipes.filter((recipe) => {
    return recipe.name === name;
  });

  return recipe;
};

module.exports = {
  list,
  find,
};
