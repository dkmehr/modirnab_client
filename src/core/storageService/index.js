const storageKey = {
  token: "token",
  user: "user",
};

const getToken = () => {
  return localStorage.getItem(storageKey.token);
};
const setToken = (token) => {
  localStorage.setItem(storageKey.token, token);
};
const removeToken = () => {
  localStorage.removeItem(storageKey.token);
};

const getUser = () => {
  return JSON.parse(localStorage.getItem(storageKey.user));
};
const setUser = (user) => {
  localStorage.setItem(storageKey.user, JSON.stringify(user));
};
const removeUser = () => {
  localStorage.removeItem(storageKey.user);
};
const clearStorage = () => {
  localStorage.clear();
};

export default {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
  clearStorage,
};
