import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  // ❌ No token → redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ⚠️ OPTIONAL: Basic expiry check (client-side)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

  } catch (err) {
    // ❌ Invalid token
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;