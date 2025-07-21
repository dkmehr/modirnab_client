import React, { useState } from "react";
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
} from "@mui/material";
import { moneyFormater } from "@libs/utils/money";
import localstorage from "@core/storageService";
import { updateProfile } from "@services/userService.js";
import { Message } from "@/libs/utils/message";
import PropTypes from "prop-types";
const TransportTable = (props) => {
  const { hasAddress, user, transport, onUpdate } = props;

  const [editedData, setEditedData] = useState({ Address: "", postalCode: "" });
  const [hasChanges, setHasChanges] = useState(false);
  const fieldsToShow = {
    Address: "آدرس",
    postalCode: "کد پستی",
  };
  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setEditedData((prev) => {
        const updatedData = { ...prev, [name]: value };
        setHasChanges(JSON.stringify(updatedData));
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
      console.log(updatedUser, "updatedUser");
      const response = await updateProfile(updatedUser);
      localstorage.setUser(response.data.data);
      // setUserData(editedData);
      setHasChanges(false);
      Message("success", "به روز رسانی آدرس با موفقیت انجام شد");
      onUpdate();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              <Typography>روش ارسال:</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{transport[0].transportName}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className="persian-number">
                هزینه ارسال: {moneyFormater(transport[0].transportPrice)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <Typography>آدرس:</Typography>
            </TableCell>
            {hasAddress ? (
              <>
                <TableCell align="center">
                  <Typography>{user?.Address}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>کدپستی:{user?.postalCode}</Typography>
                </TableCell>
              </>
            ) : (
              <>
                {["Address", "postalCode"].map((key) => (
                  <TableCell key={key}>
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
                  </TableCell>
                ))}
                {hasChanges && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      ذخیره اطلاعات
                    </Button>
                  </TableCell>
                )}
              </>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
TransportTable.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
export default TransportTable;
