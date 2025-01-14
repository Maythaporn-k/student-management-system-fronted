import axios from "axios";

//TODO: AxiosInstance
const AxiosInstance = axios.create({
  baseURL: "http://localhost:3001", // your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
