import { Box, Button, TextField, Paper } from "@mui/material";
import { useState } from "react";
import { addCategory } from "../../api/categories";

const CreateCategoryForm = ({ onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) return;

    try {
      await addCategory({ name, image });
      setName("");
      setImage("");
      onCategoryAdded();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Category
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateCategoryForm;
