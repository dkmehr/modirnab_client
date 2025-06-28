import { toast } from "react-toastify";

const Message = (status, title, position = "top-right") => {
  toast[status](title, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export { Message };
