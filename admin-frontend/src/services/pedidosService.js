import axios from 'axios';

const API_URL = 'http://localhost:8000/api/admin/pedidos';

// Obtiene el token del localStorage
const token = localStorage.getItem('token');

// Configura el header de autorización con el token
const axiosConfig = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const getPedidos = () => axios.get(API_URL, axiosConfig);
export const getPedido = (id) => axios.get(`${API_URL}/${id}`, axiosConfig);
export const createPedido = (pedido) => axios.post(API_URL, pedido, axiosConfig);
export const updatePedido = (id, pedido) => axios.put(`${API_URL}/${id}`, pedido, axiosConfig);
export const deletePedido = (id) => axios.delete(`${API_URL}/${id}`, axiosConfig);
