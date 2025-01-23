import axios from "axios";

//TODO: AxiosInstance
const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_ENDPOINT, // your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
