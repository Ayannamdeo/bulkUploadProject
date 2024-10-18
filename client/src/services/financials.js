import axios from "axios";
import { getToken } from "../utils/helpers/auth";

const API_URL = import.meta.env.VITE_API_URL;

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

      return data;
    } else {
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
