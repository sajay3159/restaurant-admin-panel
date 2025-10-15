import { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import NotificationSnackbar from "../Common/NotificationSnackbar";

const CreateRecipe = ({
  categories = [],
  onRecipeAdded,
  initialData = null,
}) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    ingredient: "",
    price: "",
    imageUrl: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        category: initialData.category || "",
        ingredient: initialData.ingredient || "",
        price: initialData.price || "",
        imageUrl: initialData.imageUrl || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { name, category, ingredient, price } = form;

    if (!name || !category || !ingredient || !price) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields.",
        severity: "warning",
      });
      return;
    }

    const cleanForm = {
      ...form,
      price: Number(form.price),
    };
    onRecipeAdded && onRecipeAdded(cleanForm);
    setForm({
      name: "",
      category: "",
      ingredient: "",
      price: "",
      imageUrl: "",
    });

    setSnackbar({
      open: true,
      message: initialData ? "Recipe updated" : "Recipe added",
      severity: "success",
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? "Edit Recipe" : "Add New Recipe"}
      </Typography>

      <TextField
        label="Recipe Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        {categories.length > 0 ? (
          categories.map(({ id, name }) => (
            <MenuItem key={id} value={name}>
              {name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No categories available</MenuItem>
        )}
      </TextField>

      <TextField
        label="Ingredient"
        name="ingredient"
        value={form.ingredient}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        // required
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Image URL"
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        {initialData ? "Update Recipe" : "Add Recipe"}
      </Button>

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default CreateRecipe;
