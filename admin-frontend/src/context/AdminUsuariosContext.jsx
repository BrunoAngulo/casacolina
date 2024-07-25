// AdminUsuariosContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsuariosContext = createContext();

const AdminUsuariosProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);

    const getAuthToken = () => {
        return localStorage.getItem('token');
    };

    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });

    const fetchUsuarios = async () => {
        try {
            const response = await axiosInstance.get('/admin/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const getUsuarioById = async (id) => {
        try {
            const response = await axiosInstance.get(`/admin/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const createUsuario = async (usuario) => {
        try {
            const response = await axiosInstance.post('/admin/usuarios', usuario);
            setUsuarios([...usuarios, response.data]);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const updateUsuario = async (id, updatedUsuario) => {
        try {
            const response = await axiosInstance.put(`/admin/usuarios/${id}`, updatedUsuario);
            setUsuarios(usuarios.map(usuario => (usuario.id === id ? response.data : usuario)));
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const deleteUsuario = async (id) => {
        try {
            await axiosInstance.delete(`/admin/usuarios/${id}`);
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <AdminUsuariosContext.Provider value={{ usuarios, fetchUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario }}>
            {children}
        </AdminUsuariosContext.Provider>
    );
};

export { AdminUsuariosProvider, AdminUsuariosContext };
