import "./style.scss";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from "@mui/icons-material/Key";
//------------------------------------------------
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import localstorage from "@core/storageService";
import ChangePasswordDialog from "../changePassword";

const SidebarMobile = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen((prev) => !prev);
  const logOut = () => {
    try {
      localstorage.clearStorage();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const changePassword = () => {
    setOpenChangePassword(true);
  };
  return (
    <>
      <ChangePasswordDialog
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
      <List
        sx={{
          display: "flex",
          position: "fixed",
          bottom: 0,
          backgroundColor: "#eaeaea",
          justifyContent: "space-between",
          alignItems: "center",
          height: "inherit",
          width: "100%",
          flexDirection: "row",
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        <ListItem
          onClick={() => navigate("/")}
          disablePadding
          sx={{ display: "flex", align: "center", justifyContent: "center" }}
          className={location.pathname === "/" ? "active-route" : ""}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "center",
              px: 2.5,
            }}
          >
            <IoHomeOutline />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => navigate("/profile")}
          disablePadding
          sx={{ display: "flex", align: "center", justifyContent: "center" }}
          className={location.pathname === "/profile" ? "active-route" : ""}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "center",
              px: 2.5,
            }}
          >
            <CgProfile />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => navigate("/myOrders")}
          disablePadding
          sx={{ display: "flex", align: "center", justifyContent: "center" }}
          className={location.pathname === "/myOrders" ? "active-route" : ""}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "center",
              px: 2.5,
            }}
          >
            <MdOutlineProductionQuantityLimits />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={changePassword}
          disablePadding
          sx={{ display: "flex", align: "center", justifyContent: "center" }}
          className={location.pathname === "/profile" ? "active-route" : ""}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "center",
              px: 2.5,
            }}
          >
            <KeyIcon sx={{ fontSize: "19px" }} />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => logOut()}
          disablePadding
          sx={{ display: "flex", align: "center", justifyContent: "center" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "center",
              px: 2,
            }}
          >
            <LogoutIcon sx={{ fontSize: "19px" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};
export default SidebarMobile;
