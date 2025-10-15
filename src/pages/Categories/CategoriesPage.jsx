import { useCallback, useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getCategories, deleteCategory } from "../../api/firebaseDB";

import NotificationSnackbar from "../../components/Common/NotificationSnackbar";
import ConfirmDialog from "../../components/Common/ConfirmDialog";
import CategoryList from "../../components/Admin/CategoryList";
import CreateCategoryForm from "../../components/Admin/CreateCategoryForm ";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [dialog, setDialog] = useState({ open: false, idToDelete: null });

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

  const handleDeleteClick = (id) => {
    setDialog({ open: true, idToDelete: id });
  };

  const handleDialogClose = () => {
    setDialog({ open: false, idToDelete: null });
  };

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
        <CategoryList
          categories={categories}
          onDelete={handleDeleteClick}
          onEditSuccess={fetchCategories}
        />
      )}

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <ConfirmDialog
        open={dialog.open}
        title="Delete Category"
        content="Are you sure you want to delete this category?"
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default CategoriesPage;
