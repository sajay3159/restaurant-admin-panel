const DB_URL = "https://restaurent-app-e9615-default-rtdb.firebaseio.com/";

// Fetch all recipes
export const getRecipes = async () => {
  const response = await fetch(`${DB_URL}/recipe.json`);
  const data = await response.json();
  return Object.entries(data || {}).map(([id, value]) => ({
    id,
    ...value,
  }));
};

// Add a new  recipe
export const addRecipe = async (recipeData) => {
  const response = await fetch(`${DB_URL}/recipe.json`, {
    method: "POST",
    body: JSON.stringify(recipeData),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

// Update a recipe
export const updateRecipe = async (id, updateData) => {
  const response = await fetch(`${DB_URL}/recipe/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  return await fetch(`${DB_URL}/recipe/${id}.json`, {
    method: "DELETE",
  });
};
