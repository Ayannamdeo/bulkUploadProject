import { getToken } from "../utils/helpers/auth";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getFileReportData = async ({
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDirection = "desc",
}) => {
  try {
    // const token = getToken();
    const config = {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      params: {
        page,
        size,
        sortBy,
        sortDirection,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/financials/filereport`,
      config,
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
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
      `${API_URL}/financials/filereport`,
      config,
    );

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
