import { useState } from "react";
import { changePassword } from "@services/authService.js";
import { Message } from "@/libs/utils/message";

const useChangePassword = (onClose) => {
  const [formData, setFormData] = useState({ confPass: "", newPass: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.newPass || !formData.confPass) {
      Message("error", "برای تغییر رمز عبور باید هر دو فیلد را تکمیل کنید ");
      return;
    }

    setLoading(true);
    try {
      const response = await changePassword(formData);
      if (response.status === 200) {
        Message("success", "پسورد با موفقیت تغییر پیدا کرد");
        //localstorage.setToken(response.data.user);
        // setFormData({ confPass: "", newPass: "" });
        onClose();
      }
    } catch (error) {
      console.log("error :>> ", error);
      if (error?.response?.status === 400) {
        Message("error", error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useChangePassword;
