import axios from "axios";
import { getToken } from "../utils/helpers/auth";

export const uploadFile = async (formData, userName) => {
  try {
    const token = getToken();
    formData.append("userName", userName);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      "http://localhost:3000/api/financials/upload",
      formData,
      config,
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};
