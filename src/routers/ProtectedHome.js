import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedHome = (props) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{props.children}</>;
};

export default ProtectedHome;
