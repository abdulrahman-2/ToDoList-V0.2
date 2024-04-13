import { createContext, useContext, useState } from "react";
import MySnakbar from "../Componets/MySnakbar";

const ToastContext = createContext({});

// eslint-disable-next-line react/prop-types
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showHideToast = (message) => {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnakbar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  return useContext(ToastContext);
};
