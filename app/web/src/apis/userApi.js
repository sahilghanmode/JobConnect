import axiosInstance from "../lib/axios";

export const getUserById = (id) =>
    axiosInstance.get(`/${id}`);
