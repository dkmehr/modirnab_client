import { httpWithToken } from "@/core/httpService";

const productList = async (category) => {
  let isCategory = category ? category : "";
  return await httpWithToken.post("/panel/faktor/list-product", {
    category: isCategory,
  });
};

const singleProductDetail = async (sku, filters = null) => {
  // 1020105012;
  return await httpWithToken.post("/panel/faktor/fetch-product", {
    sku,
    filters,
  });
};

const listCategories = async () => {
  return await httpWithToken.post("/panel/faktor/list-category");
};

export { productList, singleProductDetail, listCategories };
