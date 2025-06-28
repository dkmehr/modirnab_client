import { httpWithToken } from "@/core/httpService";

const reports = async () => {
  return await httpWithToken.get("/panel/report/report-client");
};

export { reports };
