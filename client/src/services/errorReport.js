// import { getToken } from "../utils/helpers/auth";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getErrorReportData = async ({ page = 0, size = 10, logId }) => {
  try {
    console.log("inside getErrorReportData");
    // const token = getToken();
    const config = {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      params: {
        page,
        size,
        logId,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/financials/errorreport`,
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
