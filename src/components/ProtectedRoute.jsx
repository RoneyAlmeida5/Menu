import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
