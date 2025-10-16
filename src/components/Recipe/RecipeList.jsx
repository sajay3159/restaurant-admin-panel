import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  if (!recipes.length) {
    return (
      <Typography variant="body1" color="textSecondary">
        No recipes found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {recipes.map((recipe) => (
        <Grid item key={recipe.id} xs={12} sm={6} md={4}>
          <Card>
            {recipe.imageUrl && (
              <CardMedia
                component="img"
                sx={{ width: 280, height: 200, objectFit: "cover" }}
                image={recipe.imageUrl}
                alt={recipe.name}
              />
            )}
            <CardContent sx={{ py: 1 }}>
              <Typography variant="h6" gutterBottom>
                {recipe.name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {recipe.category}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight="bold"
              >
                Price: ${recipe.price}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <Box sx={{ width: "220px" }}>{recipe.ingredient}</Box>
              </Typography>
            </CardContent>
            <CardActions sx={{ py: 0.5 }}>
              <IconButton color="primary" onClick={() => onEdit(recipe)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(recipe.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
