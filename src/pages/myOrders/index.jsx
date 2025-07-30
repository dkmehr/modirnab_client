import { useState, useEffect } from "react";
import { userFacktors } from "@services/userService";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDetails, setOpenDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await userFacktors();
        console.log("Response Data:", response?.data?.data);
        setOrders(response?.data?.data || []);
      } catch (err) {
        setError("خطا در دریافت سفارشات");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const openPayment = async (faktorNum) => {
    // Redirect to payment page
    window.location.href = BASE_URL + `/payment/zarin?faktorNo=${faktorNum}`;
  };
  const toggleDetails = (id) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", mt: 4, width: "100%" }}
      >
        <Alert
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
          severity="error"
        >
          {error}
        </Alert>
      </Box>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, width: "100%" }}>
      {orders.length ? (
        <Grid container spacing={2} sx={{ overflow: "auto" }}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card
                sx={{
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent sx={{ position: "relative" }}>
                  <Chip
                    label={order.faStatus}
                    sx={{ position: "absolute", right: "10px", top: "10px" }}
                  />
                  <Typography color="primary">
                    📜 شماره فاکتور: {order.faktorNo}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    📞 شماره موبایل: {order.phone}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    📦 تعداد کل: {order.totalCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    💰 قیمت کل: {Number(order.totalPrice).toLocaleString()}{" "}
                    تومان
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>
                    👤 نام مشتری: {order.cName || "نامشخص"}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: !order.hasAddress
                        ? "column-reverse"
                        : "row",
                      justifyContent: "center",
                      mt: 2,
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      endIcon={
                        openDetails[order._id] ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )
                      }
                      onClick={() => toggleDetails(order._id)}
                    >
                      {openDetails[order._id] ? "بستن جزئیات" : "نمایش جزئیات"}
                    </Button>
                    {order.waitPay == true && order.hasAddress ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => openPayment(order.faktorNo)}
                      >
                        پرداخت
                      </Button>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: ".7rem",
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        برای پرداخت اطلاعات خود را تکمیل کنید
                      </Typography>
                    )}
                  </Box>

                  <Collapse
                    in={openDetails[order._id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List sx={{ mt: 2 }}>
                      {order.items?.length ? (
                        order.items.map((item) => (
                          <ListItem
                            key={item._id}
                            sx={{ borderBottom: "1px solid #ddd" }}
                          >
                            <ListItemText
                              primary={`📌 ${item.title}`}
                              secondary={`💵 قیمت واحد: ${Number(
                                item.unitPrice
                              ).toLocaleString()} تومان | 🔢 تعداد: ${
                                item.count
                              }`}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <Typography sx={{ textAlign: "center", mt: 1 }}>
                          آیتمی وجود ندارد
                        </Typography>
                      )}
                    </List>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography textAlign="center" sx={{ mt: 2, fontSize: "18px" }}>
          هیچ سفارشی یافت نشد.
        </Typography>
      )}
    </Box>
  );
};

export default MyOrders;
