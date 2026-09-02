import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const getDashboard = () => {
    const token = localStorage.getItem("finvestToken");

    return API.get("/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};