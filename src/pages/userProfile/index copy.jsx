import "./index.scss";
import { useEffect, useState } from "react";
import localstorage from "@core/storageService";
import { updateProfile } from "@services/userService.js";
import { Message } from "@/libs/utils/message";
import { Box, TextField, Button, Grid, Paper } from "@mui/material";
import { getStateList, getCityList } from "@/services/globalService.js";

const fieldsToShow = {
  cName: "نام",
  sName: "نام خانوادگی",
  mobile: "شماره موبایل",
  Address: "آدرس",
  meliCode: "کد ملی",
  postalCode: "کد پستی",
  phone: "شماره تلفن",
  email: "ایمیل",
  state: "استان",
  city: "شهر",
};

const UserProfile = () => {
  const getUserData = () => {
    try {
      const userData = localstorage.getUser() || {};
      return Object.keys(fieldsToShow).reduce((acc, key) => {
        acc[key] = userData[key] || "";
        return acc;
      }, {});
    } catch (error) {
      console.error("Error reading user data:", error);
      return {};
    }
  };

  const [userData, setUserData] = useState(getUserData());
  const [editedData, setEditedData] = useState(userData);
  const [hasChanges, setHasChanges] = useState(false);

  const test = async () => {
    const res = await getStateList();
    console.log(res, "res");
  };

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
    setEditedData(data);
    test();
  }, []);

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setEditedData((prev) => {
        const updatedData = { ...prev, [name]: value };
        setHasChanges(JSON.stringify(updatedData) !== JSON.stringify(userData));
        return updatedData;
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleSave = async () => {
    try {
      const storedData = localstorage.getUser() || {};
      const updatedUser = { ...storedData, ...editedData };
      const response = await updateProfile(updatedUser);
      console.log(response, "response");
      localstorage.setUser(response.data.data);
      setUserData(editedData);
      setHasChanges(false);
      Message("success", "به روز رسانی با موفقیت انجام شد");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Paper sx={{ p: 3, width: { xs: "90%", md: "90%" }, boxShadow: 3 }}>
        <Grid container spacing={2}>
          {Object.keys(fieldsToShow).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={fieldsToShow[key]}
                name={key}
                value={editedData[key] || ""}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: key === "phone" || key === "mobile",
                }}
              />
            </Grid>
          ))}
        </Grid>

        {hasChanges && (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              ذخیره اطلاعات
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default UserProfile;
