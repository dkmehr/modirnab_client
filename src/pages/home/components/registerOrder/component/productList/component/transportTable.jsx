import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  Snackbar,
  TextField,
  IconButton,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { moneyFormater } from "@libs/utils/money";
import localstorage from "@core/storageService";
import { updateProfile } from "@services/userService.js";
import { getStateList, getCityList } from "@/services/globalService.js";

import { Message } from "@/libs/utils/message";
import PropTypes from "prop-types";
import { AddBox } from "@mui/icons-material";
const fieldsToShow = {
  cName: "نام",
  sName: "نام خانوادگی",
  stateId: "استان",
  cityId: "شهر",
  Address: "آدرس",
  postalCode: "کد پستی",
};
const TransportTable = (props) => {
  const { hasAddress, user, transport, onUpdate } = props;
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
      onUpdate();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <Paper sx={{ width: "100%" }}>
      <Box component="section" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item size={6} sx={{ p: 2 }}>
            <Typography>روش ارسال:{transport[0].transportName}</Typography>
          </Grid>
          <Grid item size={6} sx={{ p: 2 }}>
            <Typography className="persian-number">
              هزینه ارسال: {moneyFormater(transport[0].transportPrice)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {["cName", "sName"].map((key) => (
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

          {["Address", "postalCode"].map((key) => (
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
      </Box>
    </Paper>
  );
};
TransportTable.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
export default TransportTable;
