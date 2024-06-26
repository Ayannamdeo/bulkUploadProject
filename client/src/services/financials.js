import axios from "axios";
import { getToken } from "../utils/helpers/auth";

export const getFinancialData = async ({
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDirection = "desc",
  globalFilter = "",
  currencyFilter = "",
  accountNameFilter = "",
}) => {
  try {
    console.log("inside getFinancialData");
    const token = getToken();
    // console.log("globalFilter");
    if (
      globalFilter !== "" ||
      currencyFilter !== "" ||
      accountNameFilter !== ""
    ) {
      console.log("inside if block");
      console.log("currency Filter inside frontend service", currencyFilter);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          size,
          sortBy,
          sortDirection,
          globalFilter,
          currencyFilter,
          accountNameFilter,
        },
      };

      const { data } = await axios.get(
        "http://localhost:3000/api/financials/search",
        config,
      );

      console.log("data from getFinancialData wiht globalFilter", data);
      return data;
    } else {
      console.log("inside else block");
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
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const deleteFinancialData = async (id) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:3000/api/financials/${id}`,
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
