import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      e.prompt(); 
    });
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer rtl />
    </>
  );
};

export default App;
