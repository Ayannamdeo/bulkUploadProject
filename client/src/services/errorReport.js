import { getToken } from "../utils/helpers/auth";
import axios from "axios";

export const getErrorReportData = async ({ page = 0, size = 10, logId }) => {
  try {
    console.log("inside getErrorReportData");
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size,
        logId,
      },
    };

    const { data } = await axios.get(
      "http://localhost:3000/api/financials/errorreport",
      config,
    );

    console.log("data from getErrorReportData", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};
