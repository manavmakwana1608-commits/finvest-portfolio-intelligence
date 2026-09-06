import axios from "axios";

const API = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});


// =====================================================
// GET PORTFOLIO HOLDINGS
// =====================================================

export const getPortfolioHoldings = async () => {

    const token = localStorage.getItem("finvestToken");

    const response = await API.get(
        "/portfolio/holdings",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// =====================================================
// GET PORTFOLIO INSIGHTS
// =====================================================
//
// Insights are generated from the existing
// portfolio holdings API.
//
// No separate backend endpoint is required.
// =====================================================

export const getPortfolioInsights = async () => {

    const token = localStorage.getItem("finvestToken");

    const response = await API.get(
        "/portfolio/holdings",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};