import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("token") !== null;
  return isAuthenticated ? children : <Navigate to="/login" replace />
};

export default PrivateRoute;
