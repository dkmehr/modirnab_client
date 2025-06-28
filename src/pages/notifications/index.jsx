import "./index.scss";
//******************************* */
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
//******************************* */
import SingleCard from "./components/singleCard";
import AlertMessage from "@/components/alertMessage";
//******************************* */
import { listNotification } from "@services/notificationService.js";
import { Message } from "@/libs/utils/message.js";
import { useEffect, useState } from "react";
const Notifications = () => {
  /* #region load data */
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);

  const renderCards = () => {
    return dataList.length == 0 ? (
      <Grid xs={12} sm={12} md={12}>
        <AlertMessage
          message="اطلاعاتی برای نمایش وجود ندارد"
          status="success"
          variant="filled"
          cutomClass="mb-20"
        />
      </Grid>
    ) : (
      dataList.map((item) => (
        <Grid xs={12} sm={12} md={4} key={item._id}>
          <SingleCard {...item} />
        </Grid>
      ))
    );
  };
  const getDataList = async () => {
    try {
      setLoading(true);
      await listNotification().then(async (response) => {
        if (response.data.filter) setDataList(response.data.filter);
      });
    } catch (error) {
      Message("error", "مشکلی در دریافت اطلاعات رخ داده است");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataList();
  }, []);
  /* #endregion */
  return (
    <section className="hero-notifications">
      <section className="header">
        <section className="title">اعلانات</section>
      </section>
      <Divider sx={{ margin: "10px 0" }} />
      <Box sx={{ flexGrow: 1, marginTop: "40px" }}>
        {loading && (
          <AlertMessage
            message="در حال دریافت اطلاعات ...."
            status="info"
            variant="filled"
            cutomClass="mb-20"
          />
        )}
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {renderCards()}
        </Grid>
      </Box>
    </section>
  );
};

export default Notifications;
