import axios from 'axios';

const API_URL = "https://gate-v2.onrender.com/api/users";

// export const getUsers = async (page = 1, search = "") => 
//     axios.get(`${API_URL}?page=${page}&search=${search}`);
export const getUsers = async (page = 1, search = "") => {
    const response = await axios.get(API_URL, {
        params: { page, search }
    });
    return response;
};
export const createUser = async (data) => axios.post(API_URL, data);
export const updateUser = async (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteUser = async (id) => axios.delete(`${API_URL}/${id}`);
