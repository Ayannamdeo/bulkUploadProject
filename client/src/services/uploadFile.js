import axios from "axios";
import { getToken } from "../utils/helpers/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadFile = async (formData, userEmail) => {
  try {
    const token = getToken();
    formData.append("userEmail", userEmail);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${API_URL}/financials/upload`,
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
