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

const CategoryList = ({ categories, onDelete }) => {
  if (!categories.length) {
    return (
      <Typography variant="body1" color="textSecondary">
        No categories found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {categories.map((cat) => (
        <Grid item xs={12} sm={6} md={4} key={cat.id}>
          <Card>
            {cat.image && (
              <CardMedia
                component="img"
                height="140"
                image={cat.image}
                alt={cat.name}
              />
            )}
            <CardContent>
              <Typography variant="h6">{cat.name}</Typography>
            </CardContent>
            <CardActions>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete("abc")}>
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
