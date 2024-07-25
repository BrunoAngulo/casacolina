import axios from 'axios';

const API_URL = 'http://localhost:8000/api/admin/comidas';

// Obtiene el token del localStorage
const token = localStorage.getItem('token');

// Configura el header de autorización con el token
const axiosConfig = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const getComidas = () => axios.get(API_URL, axiosConfig);
export const getComida = (id) => axios.get(`${API_URL}/${id}`, axiosConfig);
export const createComida = (comida) => axios.post(API_URL, comida, axiosConfig);
export const updateComida = (id, comida) => axios.put(`${API_URL}/${id}`, comida, axiosConfig);
export const deleteComida = (id) => axios.delete(`${API_URL}/${id}`, axiosConfig);
