import { httpWithToken } from "@/core/httpService";

const listAdvertise = async () => {
  return await httpWithToken.post("/setting/sliders");
};

const changeNotifStatus = async (data) => {
  return await httpWithToken.post("/setting/show-notif", {
    notifCode: data,
  });
};

const getStateList = async () => {
  return await httpWithToken.post("/setting/list-state");
};

const getCityList = async (stateId) => {
  return await httpWithToken.post("/setting/list-city", {
    stateId,
  });
};

export { listAdvertise, changeNotifStatus, getStateList, getCityList };
