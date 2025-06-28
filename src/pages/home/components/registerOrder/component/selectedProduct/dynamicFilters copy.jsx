
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";

const DynamicFilters = ({ filters, onFilterChange, selectedFilters }) => {
  if (!filters || Object.keys(filters).length === 0) {
    return (
      <Typography sx={{ textAlign: "center", mt: 2 }}>
        فیلتری برای نمایش وجود ندارد
      </Typography>
    );
  }

  const handleChange = (event, key) => {
    const newSelectedFilters = {
      ...selectedFilters,
      [key]: event.target.value,
    };
    onFilterChange(newSelectedFilters); 
  };

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
      {Object.entries(filters).map(([key, options]) => {
        const isColorFilter =
          key.toLowerCase() === "color" &&
          options.some((item) => item.colorCode);

        return (
          <FormControl key={key} sx={{ minWidth: 160, height: "50px" }}>
            <InputLabel>{`انتخاب ${key}`}</InputLabel>
            <Select
              sx={{ height: "50px" }}
              value={selectedFilters[key] || ""} 
              onChange={(event) => handleChange(event, key)}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {isColorFilter ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: option.colorCode,
                          borderRadius: "50%",
                          border: "1px solid #ccc",
                        }}
                      />
                      {option.title}
                    </Box>
                  ) : (
                    option.title
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      })}
    </Box>
  );
};

DynamicFilters.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.object.isRequired, 
};

export default DynamicFilters;
