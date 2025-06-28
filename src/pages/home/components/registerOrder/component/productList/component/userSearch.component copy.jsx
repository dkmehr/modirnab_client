import { useState, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { usersList } from "@services/userService";

const UserSelect = ({ onSelect, clearSelection, isActive }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const getUsersList = async () => {
    try {
      setLoading(true);
      const response = await usersList();
      setUsers(response.data.filter);
      setFilteredUsers(response.data.filter);
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    try {
      getUsersList();
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (clearSelection) {
      setValue(null);
    }
  }, [clearSelection]);

  const handleSearch = (event, value) => {
    if (!value) {
      setFilteredUsers(users);
      return;
    }
    // const filtered = users.filter((user) =>
    //   user.username.toLowerCase().includes(value.toLowerCase())
    // );
    const searchValue = value.toLowerCase();
    const filtered = users.filter((user) => {
      const username = user.username?.toLowerCase() || ""; 
      const phone = user.phone || ""; 
      return username.includes(searchValue) || phone.includes(searchValue);
    });
    setFilteredUsers(filtered);
  };

  return (
    <Autocomplete
      disabled={isActive}
      value={value}
      options={filteredUsers}
      getOptionLabel={(option) => option.username}
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
