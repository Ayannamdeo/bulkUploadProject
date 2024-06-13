import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated, removeToken } from "../utils/helpers/auth";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const Privateroutes = () => {
  // const token = sessionStorage.getItem("JWT");
  const isAuth = isAuthenticated();

  useEffect(() => {
    if (!isAuth) {
      removeToken();
    }
  }, [isAuth]);

  return isAuth ? (<> <Outlet /> </>) : (<Navigate replace to="/login" />);
};
