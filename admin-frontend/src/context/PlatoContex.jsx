import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PlatoContext = createContext();

const PlatoProvider = ({ children }) => {
    const [platos, setPlatos] = useState([]);

    const getAuthToken = () => {
        return localStorage.getItem('token');
    };

    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });

    const fetchPlatos = async () => {
        try {
            const response = await axiosInstance.get('/comidas');
            setPlatos(response.data);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    };

    const getPlatoById = async (id) => {
        try {
            const response = await axiosInstance.get(`/admin/comidas/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching dish:", error);
        }
    };

    const createPlato = async (plato) => {
        try {
            const response = await axiosInstance.post('/admin/comidas', plato, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPlatos([...platos, response.data]);
        } catch (error) {
            console.error("Error creating dish:", error);
        }
    };

    const updatePlato = async (id, updatedPlato) => {
        try {
            const response = await axiosInstance.post(`/admin/comidas/${id}`, updatedPlato, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPlatos(platos.map(plato => (plato.id === id ? response.data : plato)));
        } catch (error) {
            console.error("Error updating dish:", error);
        }
    };

    const deletePlato = async (id) => {
        try {
            await axiosInstance.delete(`/admin/comidas/${id}`);
            setPlatos(platos.filter(plato => plato.id !== id));
        } catch (error) {
            console.error("Error deleting dish:", error);
        }
    };

    useEffect(() => {
        fetchPlatos();
    }, []);

    return (
        <PlatoContext.Provider value={{ platos, fetchPlatos, getPlatoById, createPlato, updatePlato, deletePlato }}>
            {children}
        </PlatoContext.Provider>
    );
};

export { PlatoProvider, PlatoContext };
