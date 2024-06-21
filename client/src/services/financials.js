import axios from "axios";
import { getToken } from "../utils/helpers/auth";

export const getFinancialData = async ({
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDirection = "desc",
}) => {
  try {
    console.log("inside getFinancialData");
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
      "http://localhost:3000/api/financials/",
      config,
    );

    console.log("data from getFinancialData", data);
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
