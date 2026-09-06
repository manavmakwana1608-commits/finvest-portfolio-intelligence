import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/transactions`;


// =================================
// GET ALL TRANSACTIONS
// =================================

export const getTransactions = async () => {

    const response = await axios.get(API);

    return response.data;

};


// =================================
// GET TRANSACTION BY ID
// =================================

export const getTransactionById = async (id) => {

    const response = await axios.get(
        `${API}/${id}`
    );

    return response.data;

};


// =================================
// GET RECENT TRANSACTIONS
// =================================

export const getRecentTransactions = async () => {

    const response = await axios.get(
        `${API}/recent`
    );

    return response.data;

};


// =================================
// CREATE TRANSACTION
// =================================

export const createTransaction = async (transaction) => {

    const response = await axios.post(
        API,
        transaction
    );

    return response.data;

};


// =================================
// UPDATE TRANSACTION
// =================================

export const updateTransaction = async (
    id,
    transaction
) => {

    const response = await axios.put(
        `${API}/${id}`,
        transaction
    );

    return response.data;

};


// =================================
// DELETE TRANSACTION
// =================================
// Leave this for the final delete task.

export const deleteTransaction = async (id) => {

    const response = await axios.delete(
        `${API}/${id}`
    );

    return response.data;

};