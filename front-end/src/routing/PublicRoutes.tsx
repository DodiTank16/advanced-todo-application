import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const PublicRoutes: React.FC = ({ props }: any) => {
  const auth = useAuth();
  // const { role } = useSelector((state: RootState) => state.auth);

  if (auth) {
    // if (role === "Admin") {
    return <Navigate to="/Admin" />;
    // }
  } else {
    return <Outlet />;
  }
};

export default PublicRoutes;
