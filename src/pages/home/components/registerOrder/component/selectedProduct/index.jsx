import "./selectedProduct.scss";
import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import DynamicFilters from "./dynamicFilters";
import Button from "@mui/material/Button";
import { moneyFormater } from "@/libs/utils/money";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";

const BASE_URL = import.meta.env.VITE_URL;

const SelectedProduct = ({ productInfo, productToBasket, filterSelected }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [productOtherFields, setProductOtherFields] = useState({
    sku: "",
    count: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (productInfo?.mainProduct?.sku) {
  //    // setSelectedFilters({});
  //     setProductOtherFields({ sku: productInfo.mainProduct.sku, count: 1 });
  //     setIsLoading(true);
  //     const timer = setTimeout(() => setIsLoading(false), 100);

  //     return () => clearTimeout(timer);
  //   }
  // }, [productInfo]);
  const hasFilters = Object.keys(selectedFilters).length > 0;

  const productSource = hasFilters
    ? productInfo.productData
    : productInfo.mainProduct;

  useEffect(() => {
    if (!productInfo?.mainProduct?.sku) return;

    setProductOtherFields((prev) => ({
      ...prev,
      sku: productInfo.mainProduct.sku,
      count: 1,
    }));
    setSelectedFilters((prevFilters) => {
      return productOtherFields.sku !== productInfo.mainProduct.sku
        ? {}
        : prevFilters;
    });

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [productInfo]);

  const changeProductCount = (change) => {
    setProductOtherFields((prev) => ({
      ...prev,
      count: Math.max(1, prev.count + change),
    }));
  };

  const handleAddProductToCart = async () => {
    try {
      if (!validateFilters()) {
        toast.error("لطفا همه فیلتر ها را انتخاب کنید", {
          position: "top-right",
          autoClose: 7000,
        });
        return;
      }
      if (validateFilters()) {
        const selectedSku = hasFilters
          ? productInfo.productData.sku
          : productInfo.mainProduct.sku;
        await productToBasket({
          ...productOtherFields,
          filters: selectedFilters,
          sku: selectedSku,
        });
      } else {
        toast.error("لطفا همه فیلتر ها را انتخاب کنید", {
          position: "top-right",
          autoClose: 7000,
        });
      }
    } catch (error) {
      console.error("خطا در افزودن محصول به سبد:", error);
    }
  };

  const [errors, setErrors] = useState({});

  // const handleFilterChange = useCallback((selected) => {
  //   setSelectedFilters(selected);
  //   filterSelected({
  //     info: productOtherFields,
  //     filters: selected,
  //   });
  // }, []);

  const handleFilterChange = (selected) => {
    console.log(selected, "selected");
    setSelectedFilters(selected);
    filterSelected(selected);
    // setProductOtherFields((prev) => ({
    //   ...prev,
    //   sku: productInfo.mainProduct.sku,
    // }));
  };

  const validateFilters = () => {
    const newErrors = {};

    Object.keys(productInfo.filters).forEach((key) => {
      if (!selectedFilters[key]) {
        newErrors[key] = `لطفاً ${key} را انتخاب کنید`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const productContent = useMemo(() => {
    if (!productInfo?.mainProduct) {
      return (
        <Typography sx={{ textAlign: "center" }}>
          در حال حاضر محصولی انتخاب نشده
        </Typography>
      );
    }

    if (isLoading) {
      return (
        <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
          در حال بارگذاری...
        </Typography>
      );
    }

    const { mainProduct, productData } = productInfo;

    return (
      <Box
        className="selected-product"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box
          className="selected-product__info"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            className="wrapper-product-image"
            sx={{ width: { xs: "100%", md: "50%" }, textAlign: "center" }}
          >
            <img
              className="product-image"
              src={BASE_URL + productData.imageUrl}
              alt={productData.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
          <Box
            className="prop"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography className="prop_child">
              نام:{productSource.title}
              {/* {mainProduct.title} */}
            </Typography>
            <Typography className="prop_child">
              مدل:{productSource.nodeName}
              {/* {mainProduct.nodeName} */}
            </Typography>
            <Typography className="prop_child persian-number">
              قیمت: {moneyFormater(productData.sellPrice)}
            </Typography>
          </Box>
        </Box>
        <Box
          className="selected-product__change-prop"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <DynamicFilters
            filters={productInfo.filters}
            onFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              className="product-count"
              label="تعداد"
              variant="outlined"
              name="count"
              type="number"
              sx={{
                "& .MuiInputBase-root": {
                  height: 50,
                  width: 160,
                },
              }}
              value={productOtherFields.count}
              inputProps={{ readOnly: false, style: { textAlign: "center" } }}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value) || 1);
                setProductOtherFields((prev) => ({
                  ...prev,
                  count: value,
                }));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => changeProductCount(1)}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => changeProductCount(-1)}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <IconButton onClick={() => changeProductCount(1)}>
              <AddIcon />
            </IconButton>
            <TextField
              className="product-count"
              label="تعداد"
              variant="outlined"
              name="count"
              type="number"
              sx={{
                "& .MuiInputBase-root": {
                  height: 50,
                  width: 80,
                  textAlign: "center",
                },
              }}
              value={productOtherFields.count}
              inputProps={{ readOnly: false, style: { textAlign: "center" } }}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value) || 1);
                setProductOtherFields((prev) => ({
                  ...prev,
                  count: value,
                }));
              }}
            />
            <IconButton onClick={() => changeProductCount(-1)}>
              <RemoveIcon />
            </IconButton> */}
            <Button
              className="product-to-basket"
              variant="outlined"
              color="primary"
              sx={{ fontSize: "12px", width: "155px", marginLeft: "8px" }}
              onClick={handleAddProductToCart}
            >
              افزودن به سبد
            </Button>
          </Box>

          {Object.keys(errors).length > 0 && (
            <Typography color="error" sx={{ mt: 2 }}>
              لطفاً تمام فیلترها را انتخاب کنید.
            </Typography>
          )}
        </Box>
      </Box>
    );
  }, [productInfo, productOtherFields, selectedFilters, isLoading]);

  return productContent;
};

SelectedProduct.propTypes = {
  productInfo: PropTypes.object,
  productToBasket: PropTypes.func,
};

export default SelectedProduct;
