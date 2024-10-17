import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/register`, {
      name,
      email,
      password,
    });
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

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    console.log("data after login", data);
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

