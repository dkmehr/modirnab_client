import { useState, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { usersList } from "@services/userService";
import { debounce } from "lodash";

const UserSelect = ({ onSelect, clearSelection, isActive }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // دریافت کاربران از API
  const getUsersList = async (search = "") => {
    try {
      setLoading(true);
      const response = await usersList(search);
      setUsers(response.data.filter || []);
      setFilteredUsers(response.data.filter || []);
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersList(); // دریافت لیست اولیه کاربران
  }, []);

  useEffect(() => {
    if (clearSelection) {
      setValue(null);
    }
  }, [clearSelection]);

  // تبدیل اعداد فارسی به انگلیسی
  const toEnglishDigits = (str) =>
    str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  // جستجوی کاربران (با debounce)
  const handleSearch = debounce((event, value, reason) => {
    if (reason === "input") {
      // فقط در حالت تایپ درخواست ارسال شود
      const searchValue = value
        ? toEnglishDigits(value.trim().toLowerCase())
        : "";
      setSearchTerm(searchValue);
      getUsersList(searchValue);
    }
  }, 500);

  return (
    <Autocomplete
      disabled={isActive}
      value={value}
      options={filteredUsers.length > 0 ? filteredUsers : []}
      getOptionLabel={(option) => `${option.username} - ${option.phone}`}
      loading={loading}
      onInputChange={handleSearch}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue) {
          onSelect(newValue._id);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="نام کاربری"
          variant="outlined"
          sx={{
            "& .MuiInputBase-root": {
              height: 40,
              padding: "0",
              width: 190,
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default UserSelect;
