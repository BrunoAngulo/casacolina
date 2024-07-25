import axios from 'axios';

const API_URL = 'http://localhost:8000/api/admin/categorias';

// Obtiene el token del localStorage
const token = localStorage.getItem('token');

// Configura el header de autorización con el token
const axiosConfig = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

// Función para obtener todas las categorías
export const getCategorias = async () => {
    try {
        const response = await axios.get(API_URL, axiosConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error; // Re-lanza el error para que pueda ser manejado en la capa superior
    }
};

// Función para obtener una categoría por su ID
export const getCategoria = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Función para crear una nueva categoría
export const createCategoria = async (categoria) => {
    try {
        const response = await axios.post(API_URL, categoria, axiosConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Función para actualizar una categoría existente por su ID
export const updateCategoria = async (id, categoria) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, categoria, axiosConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Función para eliminar una categoría por su ID
export const deleteCategoria = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Función para manejar errores de la API
const handleApiError = (error) => {
    if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('API Error:', error.response.data);
    } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('Request Error:', error.request);
    } else {
        // Ocurrió un error antes de enviar la solicitud
        console.error('Error:', error.message);
    }
};
