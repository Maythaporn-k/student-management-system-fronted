import axios from "axios";

//TODO: AxiosInstance
const AxiosInstance = axios.create({
  baseURL: "https://student-management-448804.el.r.appspot.com", // your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
