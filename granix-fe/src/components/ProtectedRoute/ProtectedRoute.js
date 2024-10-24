import React from "react";
import { Navigate } from "react-router-dom";

// The ProtectedRoute component checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // If the user is authenticated, render the child components
  return children;
};

export default ProtectedRoute;