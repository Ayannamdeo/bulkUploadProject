import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("JWT", token);
};

export const getToken = () => {
  return localStorage.getItem("JWT");
};

export const removeToken = () => {
  localStorage.removeItem("JWT");
};

export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  return token && isTokenValid(token);
};
