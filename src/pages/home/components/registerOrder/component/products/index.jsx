import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

const BASE_URL = import.meta.env.VITE_URL;

const Products = ({ list, productSelected }) => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2,
        px: 2,
        py: 1,
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-thumb": {
          background: "#aaa",
          borderRadius: "3px",
        },
      }}
    >
      {list?.length ? (
        list.map((product) => (
          <Card
            key={product._id}
            sx={{
              width: 250, 
              height: 320,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              height="150"
              image={`${BASE_URL}${product.imageUrl}`}
              alt={product.title}
              sx={{
                objectFit: "contain",
                backgroundColor: "#f9f9f9",
              }}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.title}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ fontSize: "12px" }}
                onClick={() => productSelected(product)}
              >
                انتخاب محصول
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography textAlign="center" sx={{ width: "100%", mt: 2 }}>
          محصولی یافت نشد.
        </Typography>
      )}
    </Box>
  );
};

Products.propTypes = {
  list: PropTypes.array,
  productSelected: PropTypes.func,
};

export default Products;
