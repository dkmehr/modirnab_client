import Badge from "@mui/material/Badge";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
//------------------------------------------
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import { useState, useRef, useEffect } from "react";
import { useAppContext } from "@context/App/app-context";
const Notification = () => {
  const { notifications } = useAppContext();
  const ref = useRef();
  const [showListNotification, setShowListNotification] = useState(false);
  const handelOpenNotificationList = () => {
    setShowListNotification(true);
  };

  useEffect(() => {
    const checkIfclickOutside = (e) => {
      if (
        showListNotification &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setShowListNotification(false);
      }
    };

    document.addEventListener("mousedown", checkIfclickOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfclickOutside);
    };
  }, [showListNotification]);

  const renderNotifications = () => {
    if (notifications && notifications.length > 0) {
      return notifications.map((notif) => (
        <>
          <ListItem key={notif._id} alignItems="flex-start">
            <section className="wrapper-notification-status">
              {notif.status === "read" && (
                <IoIosEye className="notif-status read" />
              )}
              {notif.status === "unread" && (
                <IoMdEyeOff className="notif-status unread" />
              )}
            </section>
            <ListItemText
              primary={notif.title}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline", fontSize: "12px" }}
                    component="span"
                    variant="body2"
                  >
                    {notif.content}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider />
        </>
      ));
    }
  };

  const hasExistsNotification = () => {
    return (
      notifications &&
      notifications.length > 0 && (
        <Badge
          onClick={() => handelOpenNotificationList()}
          badgeContent={notifications.length}
          color="info"
          className="notification-badge"
        >
          <IoNotificationsOutline className="icon-action pointer" />
        </Badge>
      )
    );
  };
  return (
    <>
      {hasExistsNotification()}
      {showListNotification && (
        <List
          ref={ref}
          className="notification-list"
          subheader={
            <ListSubheader className="notification-list__sub-header">
              پیام ها
            </ListSubheader>
          }
        >
          {renderNotifications()}
        </List>
      )}
    </>
  );
};

export default Notification;
