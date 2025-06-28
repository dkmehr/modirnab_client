import Notification from "./notification";
import { BiLogOutCircle } from "react-icons/bi";
//------------------------------------------------
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

//------------------------------------------------
import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import localstorage from "@core/storageService";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const HeaderAction = () => {
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const handelConfirmationLogout = () => {
    setConfirmLogout(true);
  };
  const handelCloseConfirmationLogout = () => {
    setConfirmLogout(false);
  };

  const logout = () => {
    setConfirmLogout(false);
    localstorage.clearStorage();
    navigate("/login");
  };

  return (
    <>
      <section className="action">
        <Notification />
        <BiLogOutCircle
          className="icon-action pointer"
          onClick={() => handelConfirmationLogout()}
        />
      </section>

      <Dialog
        open={confirmLogout}
        className="dialog-confirmation-logout"
        TransitionComponent={Transition}
      >
        <DialogTitle>خروج</DialogTitle>
        <DialogContent>
          <DialogContentText className="confirm-message">
            آیا مطمئن هستید که می خواهید از حساب کاربری خود خارج شوید ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions className="wrapper-confirm-action">
          <Button
            onClick={() => handelCloseConfirmationLogout()}
            className="cancel base-style"
          >
            بستن
          </Button>
          <Button onClick={() => logout()} className="accepted base-style">
            بله مطمئنم
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HeaderAction;
