import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  return (
    <Grid container spacing={3}>
      {recipes.map(({ id, name, category, imageUrl, ingredient, price }) => (
        <Grid item key={id} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            {imageUrl && (
              <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={name}
                sx={{ objectFit: "cover" }}
              />
            )}
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {category}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight="bold"
                gutterBottom
              >
                Price: ${price}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {ingredient}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="edit"
                onClick={() =>
                  onEdit({ id, name, category, imageUrl, ingredient, price })
                }
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => onDelete(id)}
                color="error"
              >
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
