const express = require("express");
const app = express();
const PORT = 1337;
const listOfRecipes = require("./data.json");
const fs = require("fs");

// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/recipes", (req, res, next) => {
  let namesOfRecipes = listOfRecipes.recipes.map((recipe) => {
    return recipe.name;
  });
  res.status(200).json({ recipeNames: namesOfRecipes });
});

app.get("/recipes/details/:recipeName", (req, res, next) => {
  let recipeName = req.params.recipeName;
  let recipe = listOfRecipes.recipes.filter((recipe) => {
    return recipe.name === recipeName;
  });
  if (recipe.length === 0) {
    res.status(200).json({});
  } else {
    let ingredients = recipe[0].ingredients;
    let numSteps = ingredients.length;
    res.status(200).json({ details: { ingredients, numSteps } });
  }
});

app.post("/recipes", (req, res, next) => {
  let newRecipe = req.body;
  let namesOfRecipes = listOfRecipes.recipes.map((recipe) => {
    return recipe.name;
  });
  if (namesOfRecipes.indexOf(newRecipe.name) === -1) {
    listOfRecipes.recipes.push(newRecipe);
    // This allows me to update the json file with the new recipe that was created
    fs.writeFile("data.json", JSON.stringify(listOfRecipes), function (err) {
      if (err) throw err;
      console.log("complete");
    });
    res.status(201).send();
  } else {
    res.status(400).send({ error: "Recipe already exists" });
  }
});

app.put("/recipes", (req, res, next) => {
  let updatedRecipe = req.body;
  let namesOfRecipes = listOfRecipes.recipes.map((recipe) => {
    return recipe.name;
  });

  if (namesOfRecipes.indexOf(updatedRecipe.name) === -1) {
    res.status(400).send({ error: "Recipe does not exist" });
  } else {
    let updatedList = listOfRecipes.recipes.map((recipe) => {
      if (recipe.name === updatedRecipe.name) {
        return (recipe = updatedRecipe);
      } else {
        return recipe;
      }
    });
    fs.writeFile("data.json", JSON.stringify(updatedList), function (err) {
      if (err) throw err;
      console.log("complete");
    });
    res.status(201).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
