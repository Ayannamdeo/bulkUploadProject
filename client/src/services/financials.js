import axios from "axios";
import { getToken } from "../utils/helpers/auth";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

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
    if (
      globalFilter !== "" ||
      currencyFilter !== "" ||
      accountNameFilter !== ""
    ) {
      const config = {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
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

      const { data } = await axios.get(`${API_URL}/financials/search`, config);

      console.log("data from getFinancialData wiht globalFilter", data);
      return data;
    } else {
      console.log("inside else block");
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

      const { data } = await axios.get(`${API_URL}/financials/`, config);

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

    const { data } = await axios.delete(`${API_URL}/financials/${id}`, config);

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

export const createFinancialData = async (newData) => {
  console.log("newData iside createFinancilData:", newData);
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/financials/`,
      newData,
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
export const updateFinancialData = async (id, updatedData) => {
  console.log("formData iside updateFinancilData:", updatedData);
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.patch(
      `${API_URL}/financials/${id}`,
      updatedData,
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
