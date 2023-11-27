import axios from "axios";
import { BASE_URL } from "../constants";
import { getCacheStorage } from "../utils/storage";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  // const access_token = AsyncStorage.getItem("access-token");
  const access_token = await getCacheStorage("access-token");
  if (access_token) config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});

export default instance;
