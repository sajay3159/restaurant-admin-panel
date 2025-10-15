import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Grid,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CategoryList = ({ categories, onDelete, onEditClick }) => {
  if (!categories.length) {
    return (
      <Typography variant="body1" color="textSecondary">
        No categories found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {categories.map((cat) => (
        <Grid item xs={12} sm={6} md={4} key={cat.id}>
          <Card>
            {cat.image && (
              <CardMedia
                component="img"
                sx={{ width: 280, height: 200, objectFit: "cover" }}
                image={cat.image}
                alt={cat.name}
              />
            )}
            <CardContent sx={{ py: 1 }}>
              <Typography variant="h6">{cat.name}</Typography>
            </CardContent>
            <CardActions sx={{ py: 0.5 }}>
              <IconButton color="primary" onClick={() => onEditClick(cat)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(cat.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryList;
