import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.users.token); // Get token from Redux

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // If token exists, allow access to the protected route
  return children;
};

export default PrivateRoute;
