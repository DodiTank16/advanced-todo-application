import { useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { RootState } from "../redux/store";
import { useEffect } from "react";

type Props = {};

const Alert = (props: Props) => {
  const { type, message } = useSelector((state: RootState) => state?.alert);

  useEffect(() => {
    const showToast = (type: string, message: string) => {
      switch (type) {
        case "Success":
          toast.success(message);
          break;
        case "Info":
          toast.info(message);
          break;
        case "Warning":
          toast.warning(message);
          break;
        case "Error":
          toast.error(message);
          break;
        default:
          console.log("Default");
          break;
      }
    };

    if (type && message) {
      showToast(type, message);
    }
  }, [type, message]);

  return <Toaster closeButton richColors position="bottom-left" />;
};

export default Alert;
