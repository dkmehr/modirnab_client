import { httpWithToken } from "@/core/httpService";
const updateProfile = async (data) => {
  return await httpWithToken.post("/panel/user/update-client", data);
};

const userFacktors = async () => {
  return await httpWithToken.post("/panel/faktor/my-faktor");
};

const usersList = async (data) => {
  let searchUser = data ? data : "";
  console.log('searchUser :>> ', searchUser);
  return await httpWithToken.post("/panel/user/list-customers", {
    customer: searchUser,
  });
};

export { updateProfile, userFacktors, usersList };
