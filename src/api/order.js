const DB_URL = "https://restaurent-app-e9615-default-rtdb.firebaseio.com/";

// Fetch order list
export const getOrders = async () => {
  const response = await fetch(`${DB_URL}/order.json`);
  const data = await response.json();
  return Object.entries(data || {}).map(([id, value]) => ({
    id,
    ...value,
  }));
};

// Update order status
export const updateOrderStatus = async (id, newStatus) => {
  const response = await fetch(`${DB_URL}/order/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify({ status: newStatus }),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};
