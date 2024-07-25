import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PedidoContext = createContext();

const PedidoProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState([]);

    const getAuthToken = () => {
        return localStorage.getItem('token');
    };

    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });

    const fetchPedidos = async () => {
        try {
            const response = await axiosInstance.get('/pedidos');
            setPedidos(response.data);
        } catch (error) {
            console.error("Error fetching pedidos:", error);
        }
    };

    const createPedido = async (pedido) => {
        try {
            const response = await axiosInstance.post('/admin/pedidos', pedido);
            setPedidos([...pedidos, response.data]);
        } catch (error) {
            console.error("Error creating pedido:", error);
        }
    };

    const updatePedido = async (id, updatedPedido) => {
        try {
            const response = await axiosInstance.put(`/admin/pedidos/${id}`, updatedPedido);
            setPedidos(pedidos.map(pedido => (pedido.id === id ? response.data : pedido)));
        } catch (error) {
            console.error("Error updating pedido:", error);
        }
    };

    const deletePedido = async (id) => {
        try {
            await axiosInstance.delete(`/admin/pedidos/${id}`);
            setPedidos(pedidos.filter(pedido => pedido.id !== id));
        } catch (error) {
            console.error("Error deleting pedido:", error);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    return (
        <PedidoContext.Provider value={{ pedidos, fetchPedidos, createPedido, updatePedido, deletePedido }}>
            {children}
        </PedidoContext.Provider>
    );
};

export { PedidoProvider, PedidoContext };
