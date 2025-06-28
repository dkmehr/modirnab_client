import axios from "axios";
import localstorage from "@core/storageService";
import router from "@/router";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const http = axios.create({
  baseURL: BASE_URL,
});

const httpWithToken = axios.create({
  baseURL: BASE_URL,
});

httpWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const user = localstorage.getUser();

    if (token) {
      config.headers.set("Content-Type", "application/json");
      config.headers.set("x-access-token", token);
      if (user?._id) {
        config.headers.set("userid", user._id);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpWithToken.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response);

    if (error.response?.status === 401) {
      localstorage.clearStorage();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { http, httpWithToken };
