import { httpWithToken } from "@/core/httpService";

const basketList = async () => {
  return await httpWithToken.get("/panel/faktor/get-cart");
};

const addToBasket = async (product) => {
  return await httpWithToken.post("/panel/faktor/add-cart", { ...product });
};

const updateProductCount = async (product) => {
  return await httpWithToken.post("/panel/faktor/update-cart", { ...product });
};

const removeSingleProduct = async (productId) => {
  return await httpWithToken.post("/panel/faktor/remove-cart", {
    id: productId,
  });
};

const basketToFactor = async () => {
  return await httpWithToken.get("/panel/faktor/cart-to-faktor");
};

const factorFrom = async (data) => {
  return await httpWithToken.post("/panel/faktor/cart-to-faktor-from", data);
};

export {
  basketList,
  addToBasket,
  updateProductCount,
  removeSingleProduct,
  basketToFactor,
  factorFrom,
};
