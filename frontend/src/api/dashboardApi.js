import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getDashboard = () => {
    const token = localStorage.getItem("finvestToken");

    return API.get("/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};