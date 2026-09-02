import axios from "axios";

const API = "http://localhost:5000/api/stocks";

// Get all stocks
export const getStocks = async () => {
    const response = await axios.get(API);
    return response.data;
};

// Delete stock
export const deleteStock = async (id) => {
    await axios.delete(`${API}/${id}`);
};
// Update Stock
export const updateStock = async (id, stock) => {
    const response = await axios.put(`${API}/${id}`, stock);
    return response.data;
};