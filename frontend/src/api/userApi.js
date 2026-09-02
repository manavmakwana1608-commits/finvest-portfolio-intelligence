import axios from "axios";

const API = "http://localhost:5000/api/users";


// =================================
// GET ALL USERS
// =================================

export const getUsers = async () => {

    const response = await axios.get(API);

    return response.data;

};


// =================================
// GET USER BY ID
// =================================

export const getUserById = async (id) => {

    const response = await axios.get(
        `${API}/${id}`
    );

    return response.data;

};


// =================================
// CREATE USER
// =================================

export const createUser = async (user) => {

    const response = await axios.post(
        API,
        user
    );

    return response.data;

};


// =================================
// UPDATE USER
// =================================

export const updateUser = async (id, user) => {

    const response = await axios.put(
        `${API}/${id}`,
        user
    );

    return response.data;

};


// =================================
// DELETE USER
// =================================
// Leave this for the final delete task.

export const deleteUser = async (id) => {

    const response = await axios.delete(
        `${API}/${id}`
    );

    return response.data;

};