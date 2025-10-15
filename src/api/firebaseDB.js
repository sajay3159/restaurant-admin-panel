const DB_URL = "https://restaurent-app-e9615-default-rtdb.firebaseio.com/";

// Add Category
export const addCategory = async (categoryData) => {
  const response = await fetch(`${DB_URL}/categories.json`, {
    method: "POST",
    body: JSON.stringify(categoryData),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

// Get Categories
export const getCategories = async () => {
  const response = await fetch(`${DB_URL}/categories.json`);
  const data = await response.json();

  // Convert Firebase object to array
  return Object.entries(data || {}).map(([id, value]) => ({
    id,
    ...value,
  }));
};

// Delete Category
export const deleteCategory = async (id) => {
  return await fetch(`${DB_URL}/categories/${id}.json`, {
    method: "DELETE",
  });
};

// Update Category
export const updateCategory = async (id, updatedData) => {
  return await fetch(`${DB_URL}/categories/${id}.json`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json" },
  });
};
