import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useUser();

  if (user === null && token === null) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-white">
        Carregando...
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
