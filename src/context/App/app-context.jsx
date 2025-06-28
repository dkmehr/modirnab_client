import { useContext } from "react";
import { createContext, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import appReducer from "./app-reducer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const AppContext = createContext();
const initialState = {
  language: localStorage.getItem("language") || "fa",
  theme: localStorage.getItem("theme") || "light",
  user: {
    status: false,
    information: {},
    messageId: 0,
    userInfo: {},
    notifications: [],
    globalLoading: false,
  },
};

const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [isShowLoading, setShowLoading] = useState(false);
  const [state, dispatch] = useReducer(appReducer, initialState);

  const changeUser = (user) => {
    dispatch({
      type: "CHANGE_USER",
      payload: user,
    });
  };

  const getNotifications = (payload) => {
    dispatch({
      type: "NOTIFICATION_LIST",
      payload,
    });
  };

  const setUserInfo = (info) => {
    dispatch({
      type: "SET_USER_INFO",
      payload: info,
    });
  };
  const changeMesssageStatus = (id = null) => {
    dispatch({
      type: "NOTIFICATION_CHANGE_STATUS",
      payload: id,
    });
  };

  const handelGlobalLoading = (value) => {
    setShowLoading(value);
    dispatch({
      type: "SHOWLOADING",
      payload: value,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        changeUser,
        setUserInfo,
        getNotifications,
        changeMesssageStatus,
        handelGlobalLoading,
      }}
    >
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isShowLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };
