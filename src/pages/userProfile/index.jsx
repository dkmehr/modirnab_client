import "./index.scss";
import { useEffect, useState } from "react";
import localstorage from "@core/storageService";
import { updateProfile } from "@services/userService.js";
import { Message } from "@/libs/utils/message";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getStateList, getCityList } from "@/services/globalService.js";
import { ElevenMpTwoTone } from "@mui/icons-material";

const fieldsToShow = {
  cName: "نام",
  sName: "نام خانوادگی",
  mobile: "شماره موبایل",
  Address: "آدرس",
  meliCode: "کد ملی",
  postalCode: "کد پستی",
  phone: "شماره تلفن",
  email: "ایمیل",
  stateId: "استان",
  cityId: "شهر",
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
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // const data = getUserData();
    // setUserData(data);
    // setEditedData(data);
    // fetchStates();
    const data = getUserData();
    setUserData(data);
    setEditedData(data);
    fetchStates().then(() => {
      if (data.stateId) {
        fetchCities(data.stateId);
      }
    });
  }, []);

  const fetchStates = async () => {
    try {
      const res = await getStateList();
      setStates(res.data.data || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await getCityList(stateId);
      setCities(res.data.data || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

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
  const getStateWithStateId = (stateID) => {
    return states.filter((el) => el.stateId === stateID)[0];
  };
  const getCityWithStateId = (cityID) => {
    return cities.filter((el) => el.cityId === cityID)[0];
  };
  const handleStateChange = async (event) => {
    try {
      const stateIdSelected = event.target.value;
      let { stateId, stateName } = getStateWithStateId(
        stateIdSelected.toString()
      );
      setEditedData((prev) => ({
        ...prev,
        stateId: stateId,
        state: stateName,
        city: "",
      }));
      setHasChanges(true);
      await fetchCities(stateId);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleCityChange = (event) => {
    const cityIdSelected = event.target.value;
    let { cityId, cityName } = getCityWithStateId(cityIdSelected.toString());
    setEditedData((prev) => ({
      ...prev,
      city: cityName,
      cityId: cityId,
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      const storedData = localstorage.getUser() || {};
      const updatedUser = { ...storedData, ...editedData };
      console.log(updatedUser, "updatedUser");
      const response = await updateProfile(updatedUser);
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
          {[
            "cName",
            "sName",
            "mobile",
            "Address",
            "meliCode",
            "postalCode",
            "phone",
            "email",
          ].map((key) => (
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

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>استان</InputLabel>
              <Select
                value={editedData.stateId || ""}
                onChange={handleStateChange}
              >
                {states.map((state) => (
                  <MenuItem key={state._id} value={state.stateId}>
                    {state.stateName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {cities.length > 0 && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>شهر</InputLabel>
                <Select
                  value={editedData.cityId || ""}
                  onChange={handleCityChange}
                >
                  {cities.map((city) => (
                    <MenuItem key={city._id} value={city.cityId}>
                      {city.cityName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>

        {/* دکمه ذخیره تغییرات */}
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
