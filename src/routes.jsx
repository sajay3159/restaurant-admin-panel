import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPage from "./pages/Auth/ForgetPage";
import AdminLayout from "./components/Layout/AdminLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import RecipesPage from "./pages/Recipes/Recipes";
import OrdersPage from "./pages/Order/OrderPage";
import NotFound from "./components/Common/NotFound";
import { useSelector } from "react-redux";
import PublicRoute from "./pages/Auth/PublicRoute";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forget"
        element={
          <PublicRoute>
            <ForgetPage />
          </PublicRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
