import { useCallback, useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../api/firebaseDB";

import NotificationSnackbar from "../../components/Common/NotificationSnackbar";
import ConfirmDialog from "../../components/Common/ConfirmDialog";
import CategoryList from "../../components/Admin/CategoryList";
import CreateCategoryForm from "../../components/Admin/CreateCategoryForm ";
import EditCategoryDialog from "../../components/Admin/EditCategoryDialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [dialog, setDialog] = useState({ open: false, idToDelete: null });

  // Fetch list of categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to load categories",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCategoryToEdit(null);
  };

  const handleDeleteClick = (id) => {
    setDialog({ open: true, idToDelete: id });
  };

  const handleDialogClose = () => {
    setDialog({ open: false, idToDelete: null });
  };

  //   Edit category
  const handleSaveEdit = async (id, updateData) => {
    setLoading(true);
    try {
      await updateCategory(id, updateData);
      setSnackbar({
        open: true,
        message: "Category updated successfully",
        severity: "success",
      });
      fetchCategories();
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to update category",
        severity: "error",
      });
    } finally {
      setLoading(false);
      handleCloseEditDialog();
    }
  };

  //   Delete category
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteCategory(dialog.idToDelete);
      setSnackbar({
        open: true,
        message: "Category deleted successfully",
        severity: "success",
      });
      fetchCategories();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete category",
        severity: "error",
      });
    } finally {
      setLoading(false);
      handleDialogClose();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Categories
      </Typography>

      <CreateCategoryForm onCategoryAdded={fetchCategories} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CategoryList
            categories={categories}
            onDelete={handleDeleteClick}
            onEditClick={handleEditClick}
          />
          <EditCategoryDialog
            open={editDialogOpen}
            category={categoryToEdit}
            onClose={handleCloseEditDialog}
            onSave={handleSaveEdit}
          />
        </>
      )}

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <ConfirmDialog
        open={dialog.open}
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DeleteForeverIcon color="error" />
            <Typography variant="h6" component="span">
              Delete Category
            </Typography>
          </Box>
        }
        content="Are you sure you want to delete this category?"
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default CategoriesPage;
