import axios from "axios";

const jobInstance = axios.create({
  baseURL: import.meta.env.VITE_JOBS_SERVICE_URL || "http://localhost:8083",
  headers: {
    "Content-Type": "application/json",
  },
});

export default jobInstance;
