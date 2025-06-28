import { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";

const BASE_URL = import.meta.env.VITE_URL;

const CategoryList = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const allProductsItem = {
    _id: "all",
    title: "همه محصولات",
    thumbUrl: "/upload/category/all-products.jpg",
    catCode: "all",
  };
  const categoryList = [allProductsItem, ...categories];

  const handleSelectCategory = (catCode) => {
    setSelectedCategory(catCode === "all" ? null : catCode);
    onSelectCategory(catCode === "all" ? null : catCode);
  };

  return (
    <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
      {categoryList.map((category, index) => {
        const isActive =
          selectedCategory === category.catCode ||
          (category.catCode === "all" && selectedCategory === null);

        return (
          <Grid
            item
            xs={3} // در حالت موبایل دو ستون داشته باشیم
            sm={4}
            md={3}
            lg={1}
            key={category._id}
            textAlign="center"
            onClick={() => handleSelectCategory(category.catCode)}
            sx={{ cursor: "pointer" }}
          >
            <Card
              sx={{
                width: isMobile ? 80 : 100, // کوچک‌تر شدن کارت‌ها در موبایل
                height: isMobile ? 80 : 100,
                borderRadius: "50%",
                boxShadow: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                margin: "auto",
                border: isActive
                  ? "3px solid #1976d2"
                  : "3px solid transparent",
                transition: "border 0.3s ease",
                backgroundColor:
                  category.catCode === "all" ? "#f5f5f5" : "white",
              }}
            >
              {category.catCode === "all" ? (
                <Typography variant="h6" fontWeight={700} color="#1976d2">
                  🛒
                </Typography>
              ) : (
                <CardMedia
                  component="img"
                  image={`${BASE_URL}${category?.thumbUrl}`}
                  alt={category.title}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </Card>
            <Typography
              variant="subtitle1"
              fontWeight={isActive ? 700 : 600}
              color={isActive ? "#1976d2" : "inherit"}
              mt={1}
            >
              {category.title}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbUrl: PropTypes.string,
      catCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryList;

