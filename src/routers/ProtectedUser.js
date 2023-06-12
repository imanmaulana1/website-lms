import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedUser = (props) => {
  const role = Cookies.get("role");
  if (role !== "admin") {
    return <Navigate to="/classes" />;
  }

  return <>{props.children}</>;
};

export default ProtectedUser;
