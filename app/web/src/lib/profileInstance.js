import axios from "axios";

const profileInstance = axios.create({
  baseURL: import.meta.env.VITE_PROFILE_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default profileInstance;
