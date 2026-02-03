import axios from "axios";

const jobInstance = axios.create({
  baseURL: import.meta.env.VITE_JOBS_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default jobInstance;
