import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated, removeToken } from "../utils/helpers/auth";

export const Privateroutes = () => {
  const isAuth = isAuthenticated();

  useEffect(() => {
    if (!isAuth) {
      removeToken();
    }
  }, [isAuth]);

  return isAuth ? <Outlet /> : <Navigate replace to="/login" />;
};
