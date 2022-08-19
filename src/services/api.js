import axios from "axios";

export const API = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 2500,
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
