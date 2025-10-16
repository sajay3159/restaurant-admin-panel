import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../api/order";
import NotificationSnackbar from "../../components/Common/NotificationSnackbar";

const statuses = [
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to load orders",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await updateOrderStatus(orderId, newStatus);
      setSnackbar({
        open: true,
        message: "Update status orders successfully",
        severity: "success",
      });
      fetchOrders();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update status",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Box>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          Loading...
        </Box>
      )}
      <Stack spacing={2}>
        {orders.map((order) => (
          <Card
            key={order.id}
            sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
          >
            <Box sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6">
                  <strong>User</strong>: {order.user}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Items:</strong>
                </Typography>
                {order.items.map((item, i) => (
                  <Typography key={item.recipeId + i} variant="body2">
                    {item.name} x {item.qty} (${item.price * item.qty})
                  </Typography>
                ))}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Total Amount</strong>: ${order.totalAmount}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Address</strong>: {order.address}
                </Typography>
              </CardContent>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <CardActions>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    label="Status"
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardActions>
              <Typography variant="body2" color="text.secondary">
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Card>
        ))}
      </Stack>

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default OrdersPage;
