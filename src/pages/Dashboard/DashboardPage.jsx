import { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { getCategories } from "../../api/categories";
import { getRecipes } from "../../api/recipe";
import { getOrders } from "../../api/order";

const Dashboard = () => {
  const [stats, setStats] = useState({
    categoriesCount: 0,
    recipesCount: 0,
    ordersCount: 0,
    pendingOrdersCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [categories, recipes, orders] = await Promise.all([
        getCategories(),
        getRecipes(),
        getOrders(),
      ]);

      const pendingOrders = orders.filter(
        (order) => order.status.toLowerCase() === "pending"
      );

      setStats({
        categoriesCount: categories.length,
        recipesCount: recipes.length,
        ordersCount: orders.length,
        pendingOrdersCount: pendingOrders.length,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Categories",
      count: stats.categoriesCount,
      icon: <CategoryIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
      color: "#e3f2fd",
    },
    {
      title: "Recipes",
      count: stats.recipesCount,
      icon: <MenuBookIcon sx={{ fontSize: 40, color: "#388e3c" }} />,
      color: "#e8f5e9",
    },
    {
      title: "Orders",
      count: stats.ordersCount,
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: "#f57c00" }} />,
      color: "#fff3e0",
    },
    {
      title: "Pending Orders",
      count: stats.pendingOrdersCount,
      icon: <PendingActionsIcon sx={{ fontSize: 40, color: "#d32f2f" }} />,
      color: "#ffebee",
    },
  ];

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          Loading...
        </Box>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Grid container spacing={3}>
            {cards.map(({ title, count, icon, color }) => (
              <Grid item xs={12} sm={6} md={3} key={title}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: color,
                    p: 2,
                  }}
                >
                  <Box sx={{ mr: 2 }}>{icon}</Box>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" color="text.secondary">
                      {title}
                    </Typography>
                    <Typography variant="h4">{count}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
