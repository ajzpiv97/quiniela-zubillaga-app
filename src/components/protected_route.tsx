import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteI {
  authenticated: boolean;
  children: JSX.Element;
  redirectPath: string;
}

const ProtectedRoute = ({
  authenticated,
  children,
  redirectPath,
}: ProtectedRouteI) => {
  if (!authenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
