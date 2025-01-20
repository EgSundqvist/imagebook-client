import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
