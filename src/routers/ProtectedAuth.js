import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAuth = (props) => {
  const token = Cookies.get("token");
  if (token) {
    return <Navigate to="/classes" />;
  }

  return <>{props.children}</>;
};

export default ProtectedAuth;
