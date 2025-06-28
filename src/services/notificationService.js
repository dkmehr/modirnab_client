import { httpWithToken } from "@/core/httpService";

const listNotification = async (data) => {
  return await httpWithToken.post("/setting/list-notif", data);
};

const listMessages = async () => {
  return await httpWithToken.post("/setting/list-message");
};

const changeStatusSingleMessage = async (data) => {
  return await httpWithToken.post("/setting/update-message", data);
};

export { listNotification, listMessages, changeStatusSingleMessage };
