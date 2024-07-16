import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useAuth = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token) {
    return true;
  } else {
    return false;
  }
};
