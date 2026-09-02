import axios from "axios";

const API = "http://localhost:5000/api/orders";


// GET all orders
export const getOrders = async () => {

    const response = await axios.get(API);

    return response.data;

};


// GET order by ID
export const getOrderById = async (id) => {

    const response = await axios.get(
        `${API}/${id}`
    );

    return response.data;

};


// CREATE order
export const createOrder = async (order) => {

    const response = await axios.post(
        API,
        order
    );

    return response.data;

};


// UPDATE order
export const updateOrder = async (id, order) => {

    const response = await axios.put(
        `${API}/${id}`,
        order
    );

    return response.data;

};


// DELETE order
// We'll leave this for the final task.
export const deleteOrder = async (id) => {

    const response = await axios.delete(
        `${API}/${id}`
    );

    return response.data;

};