// import PropTypes from "prop-types";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Box,
//   Typography,
// } from "@mui/material";

// const DynamicFilters = ({ filters, onFilterChange, selectedFilters }) => {
//   if (!filters || Object.keys(filters).length === 0) {
//     return (
//       <Typography sx={{ textAlign: "center", mt: 2 }}>
//         فیلتری برای نمایش وجود ندارد
//       </Typography>
//     );
//   }

//   const handleChange = (event, key) => {
//     const newSelectedFilters = {
//       ...selectedFilters,
//       [key]: event.target.value,
//     };
//     onFilterChange(newSelectedFilters);
//   };

//   return (
//     <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
//       {Object.entries(filters).map(([key, options]) => {
//         const isColorFilter =
//           key.toLowerCase() === "color" &&
//           options.some((item) => item.colorCode);

//         return (
//           <FormControl key={key} sx={{ minWidth: 160, height: "50px" }}>
//             <InputLabel>{`انتخاب ${key}`}</InputLabel>
//             <Select
//               sx={{ height: "50px" }}
//               value={selectedFilters[key] || ""}
//               onChange={(event) => handleChange(event, key)}
//             >
//               {options.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {isColorFilter ? (
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Box
//                         sx={{
//                           width: 20,
//                           height: 20,
//                           backgroundColor: option.colorCode,
//                           borderRadius: "50%",
//                           border: "1px solid #ccc",
//                         }}
//                       />
//                       {option.title}
//                     </Box>
//                   ) : (
//                     option.title
//                   )}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         );
//       })}
//     </Box>
//   );
// };

// DynamicFilters.propTypes = {
//   filters: PropTypes.object,
//   onFilterChange: PropTypes.func.isRequired,
//   selectedFilters: PropTypes.object.isRequired,
// };

// export default DynamicFilters;

import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

  const handleRemoveFilter = (event, key) => {
    event.stopPropagation(); // جلوگیری از باز شدن Select
    const newSelectedFilters = { ...selectedFilters };
    delete newSelectedFilters[key];
    onFilterChange(newSelectedFilters);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
      {Object.entries(filters).map(([key, options]) => {
        const isColorFilter =
          key.toLowerCase() === "color" &&
          options.some((item) => item.colorCode);

        return (
          <FormControl key={key} sx={{ minWidth: 160, height: "50px" }}>
            <Select
              sx={{ height: "50px" }}
              value={selectedFilters[key] || ""}
              onChange={(event) => handleChange(event, key)}
              displayEmpty
              renderValue={(selected) =>
                selected ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: 1,
                      pr: 1,
                    }}
                  >
                    {isColorFilter ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: options.find(
                              (o) => o.value === selected
                            )?.colorCode,
                            borderRadius: "50%",
                            border: "1px solid #ccc",
                          }}
                        />
                        {options.find((o) => o.value === selected)?.title}
                      </Box>
                    ) : (
                      options.find((o) => o.value === selected)?.title
                    )}

                    {/* دکمه ضربدر برای حذف مقدار انتخاب‌شده */}
                    <IconButton
                      size="small"
                      onMouseDown={(e) => handleRemoveFilter(e, key)}
                      sx={{
                        color: "red",
                        p: 0,
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  `انتخاب ${key}`
                )
              }
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
