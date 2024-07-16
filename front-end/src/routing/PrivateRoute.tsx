import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes: React.FC = ({}) => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
