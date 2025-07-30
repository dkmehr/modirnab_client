import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  Snackbar,
  TextField,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { dateToPersian, dateTimeToUtc } from "@libs/utils/dateTime";
import { moneyFormater } from "@libs/utils/money";
import UserSelect from "./component/userSearch.component";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  basketList,
  removeSingleProduct,
  basketToFactor,
  factorFrom,
  updateProductCount,
} from "@services/basketService";
import ConfirmRemoveProduct from "./component/confirmRemoveProduct";
import localstorage from "@core/storageService";
import TransportTable from "./component/transportTable";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ProductList = ({ cart: propCart, cartDetail: propCartDetail }) => {
  const [products, setProducts] = useState({ cart: [] });
  const [cartDetail, setCartDetail] = useState({
    cartPrice: 0,
    cartDiscount: 0,
  });
  const [CartTransPort, setCartTransPort] = useState();
  const [UserDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [removeProductId, setRemoveProductId] = useState("");
  const [snackInfo, setSnackInfo] = useState({ show: false, message: "" });
  const [editingProductId, setEditingProductId] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [clearSelection, setClearSelection] = useState(false);

  const getBasketList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await basketList();
      setProducts(response.data || { cart: [] });
      setCartDetail(
        response.data?.cartDetail || { cartPrice: 0, cartDiscount: 0 }
      );
      setCartTransPort(response.data?.transportMethod);
      setUserDetails(response.data?.customerDetails);
    } catch (error) {
      console.error("خطا در دریافت لیست سبد خرید:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const openPayment = async () => {
    // Redirect to payment page
    window.location.href =
      BASE_URL + `/payment/zarin?id=${localstorage.getUser()._id}`;
  };
  useEffect(() => {
    if (!propCart || !propCartDetail) {
      getBasketList();
    } else {
      setProducts({ cart: propCart });
      setCartDetail(propCartDetail);
      setLoading(false);
    }
  }, [propCart, propCartDetail, getBasketList]);

  const handelSelectedUser = (id) => {
    try {
      setSelectedUser(id);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const getConfirmUserRemoveProduct = (id) => {
    try {
      setConfirmRemove(true);
      setRemoveProductId(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProduct = async () => {
    try {
      const response = await removeSingleProduct(removeProductId);
      setProducts(response.data || { cart: [] });
      setCartDetail(
        response.data?.cartDetail || { cartPrice: 0, cartDiscount: 0 }
      );
      setConfirmRemove(false);
      setRemoveProductId("");
    } catch (error) {
      console.log("خطا در حذف محصول:", error);
    }
  };

  const handleClearUserSelected = () => {
    setClearSelection(true);
    setTimeout(() => setClearSelection(false), 100);
  };

  const handleBasketFactor = async () => {
    try {
      let response = null;
      if (!products.cart.length) return;
      if (selectedUser) {
        response = await factorFrom({
          userFrom: selectedUser,
        });
        handleClearUserSelected();
      } else {
        response = await basketToFactor();
      }

      setSnackInfo({
        show: true,
        message: `سفارش شما با شماره ${response.data.faktorNo} ثبت شد`,
      });
      setProducts({ cart: [] });
      setCartDetail({
        cartPrice: 0,
        cartDiscount: 0,
      });
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) {
    return (
      <Typography
        sx={{ textAlign: "center", fontSize: "18px", padding: "20px" }}
      >
        در حال بارگذاری...
      </Typography>
    );
  }
  // console.log(localstorage.getUser().business);
  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {["محصول", "قیمت واحد", "قیمت", "تعداد", "تاریخ", "عملیات"].map(
                (header) => (
                  <TableCell key={header} align="center">
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.cart.length > 0 ? (
              products.cart.map((product) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  onRemove={getConfirmUserRemoveProduct}
                  onUpdate={getBasketList}
                  editingProductId={editingProductId}
                  setEditingProductId={setEditingProductId}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  سبد خرید شما خالی است.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmRemoveProduct
        show={confirmRemove}
        close={() => setConfirmRemove(false)}
        accepted={handleRemoveProduct}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "space-between",
          padding: "20px",
          paddingRight: "0",
          borderTop: "1px solid #ddd",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 2,
            width: { xs: "100%", md: "60%" },
          }}
        >
          <TransportTable
            transport={CartTransPort}
            user={UserDetails}
            hasAddress={products.hasAddress}
            onUpdate={getBasketList}
          />
          {localstorage.getUser().business == true || products.hasAddress ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: { md: "space-between", xs: "center" },
                alignItems: "center",
                gap: 2,
                width: { xs: "100%", md: "unset" },
              }}
            >
              {localstorage.getUser()?.access === "customerAdmin" && (
                <UserSelect
                  onSelect={handelSelectedUser}
                  clearSelection={clearSelection}
                  isActive={!products.cart.length}
                />
              )}
              {localstorage.getUser().business == true && (
                <Button
                  disabled={!products.cart.length}
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: "12px", width: "150px" }}
                  onClick={handleBasketFactor}
                >
                  ثبت سفارش
                </Button>
              )}
              <Button
                disabled={!products.cart.length}
                variant="outlined"
                color="primary"
                sx={{ fontSize: "12px", width: "150px" }}
                onClick={openPayment}
              >
                پرداخت
              </Button>

              {/* {localstorage.getUser()?.access === "customerAdmin" && (
                <UserSelect
                  onSelect={handelSelectedUser}
                  clearSelection={clearSelection}
                  isActive={!products.cart.length}
                />
              )} */}
            </Box>
          ) : (
            <Typography sx={{ color: "red" }}>
              لطفا اطلاعات خود را وارد کنید!
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            width: { xs: "100%", md: "unset" },
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <Typography className="persian-number">
                      مجموع قیمت
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className="persian-number">
                      {moneyFormater(cartDetail.cartPrice)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <Typography className="persian-number">تخفیف</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className="persian-number">
                      {moneyFormater(cartDetail.cartDiscount)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <Typography className="persian-number">
                      هزینه ارسال
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className="persian-number">
                      {moneyFormater(cartDetail.transportPrice)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <Typography className="persian-number">
                      مجموع فاکتور
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className="persian-number">
                      {moneyFormater(cartDetail.fullPrice)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Snackbar
        open={snackInfo.show}
        autoHideDuration={5000}
        message={snackInfo.message}
        onClose={() => setSnackInfo((prev) => ({ message: "", show: false }))}
      />
    </>
  );
};

const ProductRow = ({
  product,
  onRemove,
  onUpdate,
  editingProductId,
  setEditingProductId,
}) => {
  const isEditing = editingProductId === product._id;
  const [newCount, setNewCount] = useState(product.count);

  const handleUpdateCount = async () => {
    if (newCount <= 0) {
      setNewCount(1);
      return;
    }

    try {
      await updateProductCount({
        count: newCount,
        id: product._id,
      });
      setEditingProductId(null);
      onUpdate();
    } catch (error) {
      console.error("خطا در ویرایش تعداد محصول:", error);
    }
  };

  return (
    <TableRow>
      <TableCell align="center">{product.title}</TableCell>
      <TableCell align="center" className="persian-number">
        {moneyFormater(product.unitPrice)}
      </TableCell>
      <TableCell align="center" className="persian-number">
        {moneyFormater(product.price)}
      </TableCell>
      <TableCell align="center" className="persian-number">
        {isEditing ? (
          // <TextField
          //   type="number"
          //   value={newCount}
          //   onChange={(e) => {
          //     const value = parseInt(e.target.value, 10);
          //     if (!isNaN(value) && value > 0) {
          //       setNewCount(value);
          //     }
          //   }}
          //   size="small"
          //   className="persian-number"
          //   sx={{ width: "60px" }}
          // />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={() => setNewCount((prev) => prev + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            <TextField
              type="number"
              value={newCount}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value > 0) {
                  setNewCount(value);
                }
              }}
              size="small"
              className="persian-number"
              sx={{ width: "50px", textAlign: "center" }}
              inputProps={{ style: { textAlign: "center" } }}
            />

            <IconButton
              size="small"
              onClick={() => setNewCount((prev) => Math.max(prev - 1, 1))}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          product.count
        )}
      </TableCell>
      <TableCell align="center" className="persian-number">
        {dateTimeToUtc(product.initDate)}
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={() => onRemove(product._id)}>
          <DeleteIcon color="primary" />
        </IconButton>
        {isEditing ? (
          <IconButton onClick={handleUpdateCount}>
            <CheckIcon color="success" />
          </IconButton>
        ) : (
          <IconButton onClick={() => setEditingProductId(product._id)}>
            <EditIcon color="primary" />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

ProductRow.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    unitPrice: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    initDate: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  editingProductId: PropTypes.string,
  setEditingProductId: PropTypes.func.isRequired,
};

export default ProductList;
