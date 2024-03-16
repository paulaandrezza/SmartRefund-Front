import { getCookie } from "@/utils/helpers/manageCookies";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getCookie();

    if (token !== undefined) {
      const auth = `Bearer ${token.value}`;
      config.headers["Authorization"] = auth;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
