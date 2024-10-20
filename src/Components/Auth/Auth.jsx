import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedAuth() {
  let location = useLocation();

  return localStorage.getItem("user") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
export function ProtectedLoginAuth() {
  let location = useLocation();
  return localStorage.getItem("user") ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
export default ProtectedAuth;
