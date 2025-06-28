import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import useChangePassword from "@/libs/hooks/useChangePassword";
// import { changePassword } from "@services/authService.js";
// import { Message } from "@/libs/utils/message";
// import localstorage from "@core/storageService";

const ChangePasswordDialog = ({ open, onClose }) => {
  const { formData, loading, handleChange, handleSubmit } =
    useChangePassword(onClose);
  // const [formData, setFormData] = useState({ confPass: "", newPass: "" });
  // const [loading, setLoading] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (/^\d*$/.test(value)) {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  // const handleSubmit = async () => {
  //   if (!formData.newPass || !formData.confPass) {
  //     Message("error", "برای تغییر رمز عبور باید هر دو فیلد را تکمیل کنید ");
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const response = await changePassword(formData);
  //     if (response.status === 200) {
  //       Message("success", "پسورد با موفقیت تغییر پیدا کرد");
  //       localstorage.setToken(response.data.user);
  //       setFormData({ confPass: "", newPass: "" });
  //       onClose();
  //     }
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //     if (error && error.response.status === 400)
  //       Message("error", error.response.data.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Dialog
        open={open}
        onClose={null}
        disableEscapeKeyDown
        disableEnforceFocus
        disableRestoreFocus
      >
        <DialogTitle>تغییر رمز عبور</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="رمز عبور جدید"
            type="text"
            name="newPass"
            value={formData.newPass}
            onChange={handleChange}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="تکرار رمز عبور"
            type="text"
            name="confPass"
            value={formData.confPass}
            onChange={handleChange}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", gap: 2, pb: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ width: "100px" }}
          >
            {loading ? <CircularProgress size={24} /> : "تایید"}
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose}>
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePasswordDialog;
