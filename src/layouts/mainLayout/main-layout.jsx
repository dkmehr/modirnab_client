import "./style.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SidebarMobile from "@/components/SidebarMobile";
//****************************************** */
import localstorage from "@core/storageService";
import { useAppContext } from "@context/App/app-context";
import {
  listMessages,
  changeStatusSingleMessage,
} from "@services/notificationService.js";
import { Message } from "@/libs/utils/message";
const MainLayout = () => {
  const theme = useTheme();
  const { setUserInfo, getNotifications, messageId } = useAppContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const token = localstorage.getToken();

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
    else {
      //getMessageList();
      setUserInfo(localstorage.getUser());
    }
  }, [token]);

  const getMessageList = async () => {
    try {
      await listMessages().then((response) => {
        console.log(response, "response message");
        getNotifications(response.data.filter);
      });
    } catch (error) {
      Message("error", "خطایی رخ داده است ، مجددا تلاش نمایید");
    }
  };

  const changeStatusMessage = async () => {
    try {
      const modelChangeStatus = {
        messageId,
        status: "read",
      };
      await changeStatusSingleMessage(modelChangeStatus).then(
        async (response) => {
          if (response.status === 200) {
            Message("success", "عملیات با موفقیت انجام شد");
            // await getMessageList();
          }
        }
      );
    } catch (error) {
      Message("error", "خطایی رخ داده است ، مجددا تلاش نمایید");
    }
  };

  // useEffect(() => {
  //   if (messageId) changeStatusMessage();
  // }, [messageId]);
  return (
    <>
      {/* <Header />  */}
      <section className="main">
        {!isMobile && <Sidebar />}
        <Outlet />
        {isMobile && <SidebarMobile />}
      </section>
    </>
  );
};

export default MainLayout;
