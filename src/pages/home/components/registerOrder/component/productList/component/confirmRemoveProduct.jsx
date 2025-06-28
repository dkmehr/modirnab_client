import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmRemoveProduct = ({ show, close, accepted }) => {
  return (
    <Dialog
      open={show}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => close()}
      aria-describedby="alert-dialog-slide-description"
      disableEscapeKeyDown // جلوگیری از بسته شدن دیالوگ با کلید Escape
      disableScrollLock // جلوگیری از تداخل اسکرول
    >
      <DialogTitle id="alert-dialog-title">هشدار</DialogTitle>
      <DialogContent>
        <DialogContentText>
          آیا مطمئن هستید که می خواهید این محصول را حذف کنید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ textAlign: "center" }}>
        <Button onClick={() => close()}>بستن</Button>
        <Button onClick={() => accepted()}>بله</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmRemoveProduct.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  accepted: PropTypes.func,
};

export default ConfirmRemoveProduct;
