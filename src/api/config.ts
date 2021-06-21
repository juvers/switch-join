import { AxiosRequestConfig } from "axios";

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: "https://randomuser.me/api/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
};
