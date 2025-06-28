import { http, httpWithToken } from "@/core/httpService";

const otpSend = async (data) => {
  return await http.post("/auth/customer-otp", data);
};

const otpLogin = async (data) => {
  return await http.post("/auth/login-otp", data);
};

const passwordLogin = async (data) => {
  return await http.post("/auth/login-customer", data);
};

const changePassword = async (data) => {
  return await httpWithToken.post("/auth/change-password", data);
};

export { otpSend, otpLogin, passwordLogin, changePassword };
