import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";

export const API = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 2500,
});

// API.interceptors.request.use(
//   (config) => {
//     if (hasCookie("loginData")) {
//       config.headers.Authorization = `Bearer ${getCookie("loginData")}
//       `;
//     }

//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

// API.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );
