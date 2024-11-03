// PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("jwtToken");
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
