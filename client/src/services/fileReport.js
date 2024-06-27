import { getToken } from "../utils/helpers/auth";
import axios from "axios";

export const getFileReportData = async ({
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDirection = "desc",
}) => {
  try {
    console.log("inside getFileReportData");
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size,
        sortBy,
        sortDirection,
      },
    };

    const { data } = await axios.get(
      "http://localhost:3000/api/financials/filereport",
      config,
    );

    console.log("data from getFileReportData", data);
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

export const deleteAllFileData = async (uploadId) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { uploadId },
    };

    const { data } = await axios.delete(
      `http://localhost:3000/api/financials/filereport`,
      config,
    );

    console.log("data from deleteAllFileData", data);
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
