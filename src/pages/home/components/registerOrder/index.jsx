import "./RegisterOrder.scss";
import Products from "./component/Products";
import ProductList from "./component/ProductList";
import SelectedProduct from "./component/selectedProduct";
import Divider from "@mui/material/Divider";
import Categories from "./component/Categories";
import {
  productList,
  singleProductDetail,
  listCategories,
} from "@services/productService";
import { useEffect, useState } from "react";
import { useAppContext } from "@context/App/app-context";
import { addToBasket } from "@services/basketService";
import { toast } from "react-toastify";

const RegisterOrder = () => {
  const { handelGlobalLoading } = useAppContext();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [basket, setBasket] = useState({});
  const getProducts = async (category = null) => {
    try {
      await handelGlobalLoading(true);
      const response = await productList(category);
      const { data } = response.data;
      setProducts(data);
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      await handelGlobalLoading(false);
    }
  };

  const getCategoris = async () => {
    try {
      await handelGlobalLoading(true);
      const response = await listCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      await handelGlobalLoading(false);
    }
  };

  //--------------------------------------------
  const getProductSelected = async (productSelected) => {
    try {
      await setSingleProduct({});
      const response = await singleProductDetail(productSelected.sku);
      if (response.status === 200) setSingleProduct(response.data);
      // console.log(response, "response single product");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const singleProductToBasket = async (product) => {
    try {
      await setSingleProduct({});
      const response = await addToBasket(product);
      const { cart, cartDetail, hasAddress } = response.data;
      setBasket({
        cart,
        cartDetail,
        hasAddress,
      });
      await setSingleProduct({});
    } catch (error) {
      if (error.response) {
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
    }
  };
  const handleCategorySelect = async (catCode) => {
    try {
      let catSelected = catCode !== "all" ? catCode : "";
      await getProducts(catSelected);
    } catch (error) {
      console.log(error);
    }
  };

  const handelChangeFilterGetNewInfo = async (filterProduct) => {
    try {
      const productId = singleProduct.mainProduct.sku;
      const response = await singleProductDetail(productId, filterProduct);
      if (response.status === 200) setSingleProduct(response.data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  //--------------------------------------------

  useEffect(() => {
    getProducts();
    getCategoris();
  }, []);
  return (
    <section className="register-order">
      <Categories
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />
      <section className="register-order__products">
        <Products list={products} productSelected={getProductSelected} />
      </section>
      <Divider sx={{ my: 2 }} />
      <SelectedProduct
        productInfo={singleProduct}
        productToBasket={(product) => singleProductToBasket(product)}
        filterSelected={handelChangeFilterGetNewInfo}
      />
      <Divider sx={{ my: 2 }} />
      <ProductList
        cart={basket.cart}
        cartDetail={basket.cartDetail}
        cartAddress={basket.hasAddress}
      />
    </section>
  );
};

export default RegisterOrder;
