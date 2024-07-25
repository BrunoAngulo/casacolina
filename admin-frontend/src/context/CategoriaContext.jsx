import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const CategoriaContext = createContext();

const CategoriaProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);

    const getAuthToken = () => {
        return localStorage.getItem('token');
    };

    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });

    const fetchCategorias = async () => {
        try {
            const response = await axiosInstance.get('/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getCategoriaById = async (id) => {
        try {
            const response = await axiosInstance.get(`/admin/categorias/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const createCategoria = async (categoria) => {
        try {
            const formData = new FormData();
            formData.append('nombre', categoria.nombre);
            if (categoria.icono) {
                formData.append('icono', categoria.icono, categoria.icono.name);
            }

            const response = await axiosInstance.post('/admin/categorias', formData);
            setCategorias([...categorias, response.data]);
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const updateCategoria = async (id, updatedCategoria) => {
        try {
            const formData = new FormData();
            formData.append('nombre', updatedCategoria.nombre);
            if (updatedCategoria.icono) {
                formData.append('icono', updatedCategoria.icono, updatedCategoria.icono.name);
            }

            const response = await axiosInstance.post(`/admin/categorias/${id}?_method=PUT`, formData);
            setCategorias(categorias.map(categoria => (categoria.id === id ? response.data : categoria)));
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const deleteCategoria = async (id) => {
        try {
            await axiosInstance.delete(`/admin/categorias/${id}`);
            setCategorias(categorias.filter(categoria => categoria.id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    return (
        <CategoriaContext.Provider value={{ categorias, fetchCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria }}>
            {children}
        </CategoriaContext.Provider>
    );
};

export { CategoriaProvider, CategoriaContext };