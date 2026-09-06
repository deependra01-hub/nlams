import axios from "axios";
import { getApiBaseUrl } from "../utils/env";

export { getApiBaseUrl } from "../utils/env";

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
