import axios from "axios";

//TODO: AxiosInstance
const AxiosInstance = axios.create({
  baseURL:
    "https://maythaporn-k.github.io/student-management-system-backend-orch/", // your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
