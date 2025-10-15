import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPage from "./pages/Auth/ForgetPage";
import AdminLayout from "./components/Layout/AdminLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import RecipesPage from "./pages/Recipes/Recipes";
import OrdersPage from "./pages/Order/OrderPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget" element={<ForgetPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
