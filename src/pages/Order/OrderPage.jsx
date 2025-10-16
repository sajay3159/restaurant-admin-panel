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
import { getOrders } from "../../api/order";

const ordersSample = [
  {
    user: "john@example.com",
    items: [
      { recipeId: "r1", name: "Paneer Tikka", qty: 3, price: 15 },
      { recipeId: "r2", name: "Veg Burger", qty: 1, price: 20 },
    ],
    totalAmount: 65,
    status: "pending",
    createdAt: "2025-10-15T14:30:00Z",
    address:
      "Suresh Kumar, Flat No. 12B, Sunrise Apartments, 5th Cross Street, Gandhi Nagar, Bangalore, Karnataka – 560001. Phone: +91 98765 43210",
  },
  {
    user: "anita@example.com",
    items: [{ recipeId: "r3", name: "French Fries", qty: 2, price: 5 }],
    totalAmount: 10,
    status: "processing",
    createdAt: "2025-10-14T13:00:00Z",
    address:
      "Anita Sharma, Flat No. 8A, Sunrise Apartments, MG Road, Bangalore, Karnataka – 560001. Phone: +91 98765 43211",
  },
  {
    user: "rajesh@example.com",
    items: [{ recipeId: "r4", name: "Veggie Pizza", qty: 1, price: 30 }],
    totalAmount: 30,
    status: "delivered",
    createdAt: "2025-10-13T19:45:00Z",
    address:
      "Rajesh Kumar, Flat No. 3C, Sunrise Apartments, MG Road, Bangalore, Karnataka – 560001. Phone: +91 98765 43212",
  },
  {
    user: "sunita@example.com",
    items: [
      { recipeId: "r5", name: "Masala Dosa", qty: 2, price: 20 },
      { recipeId: "r6", name: "Cold Coffee", qty: 1, price: 5 },
    ],
    totalAmount: 45,
    status: "cancelled",
    createdAt: "2025-10-12T18:00:00Z",
    address:
      "Sunita Verma, Flat No. 5D, Green Meadows, Jayanagar, Bangalore, Karnataka – 560041. Phone: +91 98765 43213",
  },
  {
    user: "manish@example.com",
    items: [{ recipeId: "r7", name: "Chicken Biryani", qty: 4, price: 50 }],
    totalAmount: 200,
    status: "pending",
    createdAt: "2025-10-16T09:30:00Z",
    address:
      "Manish Patel, Flat No. 1A, Lotus Apartments, Electronic City, Bangalore, Karnataka – 560100. Phone: +91 98765 43214",
  },
];

const statuses = [
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];
const OrdersPage = () => {
  const [orders, setOrders] = useState("");
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

  const handleStatusChange = () => {};

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Box>
      {loading && <Box>Loading...</Box>}
      <Stack spacing={2}>
        {ordersSample.map((order) => (
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
    </Box>
  );
};

export default OrdersPage;
