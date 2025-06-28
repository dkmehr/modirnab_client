import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BASE_URL = import.meta.env.VITE_URL;

const Slider = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", mt: 2 }}>
        اسلایدری برای نمایش وجود ندارد
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "800px", mx: "auto", mt: 3 }}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 2,
          },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <Box sx={{ textAlign: "center", position: "relative" }}>
              <img
                src={BASE_URL + item.imageUrl}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                {item.title}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

Slider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      imageUrl: PropTypes.string,
      enTitle: PropTypes.string,
      thumbUrl: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
};

export default Slider;
