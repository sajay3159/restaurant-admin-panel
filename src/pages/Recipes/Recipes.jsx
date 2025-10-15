import { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";

import {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../api/recipe";

import NotificationSnackbar from "../../components/Common/NotificationSnackbar";
import RecipeList from "../../components/Recipe/RecipeList";
import ConfirmDialog from "../../components/Common/ConfirmDialog";
import CreateRecipe from "../../components/Recipe/CreateRecipe";
import { getCategories } from "../../api/categories";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editData, setEditData] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    idToDelete: null,
  });

  // Fetch recipe
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const data = await getRecipes();
      setRecipes(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to load recipes",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories once
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to load categories",
        severity: "error",
      });
    }
  };

  // Add or Edit recipe
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editData) {
        await updateRecipe(editData.id, formData);
        setSnackbar({
          open: true,
          message: "Recipe updated successfully",
          severity: "success",
        });
      } else {
        await addRecipe(formData);
        setSnackbar({
          open: true,
          message: "Recipe added successfully",
          severity: "success",
        });
      }
      setEditData(null);
      fetchRecipes();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Operation failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (recipe) => {
    setEditData(recipe);
  };

  const handleCancelEdit = () => {
    setEditData(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteDialog({ open: true, idToDelete: id });
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteRecipe(deleteDialog.idToDelete);
      setSnackbar({
        open: true,
        message: "Recipe deleted successfully",
        severity: "success",
      });
      fetchRecipes();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete recipe",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setDeleteDialog({ open: false, idToDelete: null });
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Recipes
      </Typography>

      <CreateRecipe
        initialData={editData}
        categories={categories}
        onRecipeAdded={handleFormSubmit}
      />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      <RecipeList
        recipes={recipes}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DeleteForeverIcon color="error" />
            <Typography variant="h6" component="span">
              Delete Recipe
            </Typography>
          </Box>
        }
        content="Are you sure you want to delete this recipe?"
        onClose={() => setDeleteDialog({ open: false, idToDelete: null })}
        onConfirm={handleConfirmDelete}
      />

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default RecipesPage;
