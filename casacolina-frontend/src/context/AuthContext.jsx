import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const getToken = () => localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/user', {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });
                    if (response.data && response.data.user) {
                        console.log('Usuario obtenido:', response.data.user);
                        setUser(response.data.user);
                        await fetchDeliveryInfoByUserId(response.data.user.id);
                    } else {
                        console.error('Datos de usuario no válidos:', response.data);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            if (response.data && response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                await fetchDeliveryInfoByUserId(response.data.user.id);
            } else {
                console.error('Datos de login no válidos:', response.data);
            }
        } catch (error) {
            console.error('Error en login:', error);
            throw new Error('Login failed');
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', { name, email, password });
            if (response.data && response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                await fetchDeliveryInfoByUserId(response.data.user.id);
            } else {
                console.error('Datos de registro no válidos:', response.data);
            }
        } catch (error) {
            console.error('Error en registro:', error);
            throw new Error('Registration failed');
        }
    };

    const logout = async () => {
        try {
            const token = getToken();
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(null);
            setDeliveryInfo(null);
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Error en logout:', error);
            throw new Error('Logout failed');
        }
    };

    const getInfoClient = async () => {
        try {
            const token = getToken();
            const response = await axios.get('http://127.0.0.1:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data && response.data.delivery_info) {
                console.log('Información de entrega obtenida:', response.data.delivery_info);
                setDeliveryInfo(response.data.delivery_info);
            } else {
                console.error('Datos de entrega no válidos:', response.data);
            }
        } catch (error) {
            console.error("Error al obtener la información de entrega:", error);
        }
    };

    const fetchDeliveryInfoByUserId = async (userId) => {
        try {
            const token = getToken();
            const response = await axios.get(`http://127.0.0.1:8000/api/delivery-info/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) {
                console.log('Información de entrega por user_id obtenida:', response.data);
                setDeliveryInfo(response.data);
            } else {
                console.error('Datos de entrega no válidos:', response.data);
            }
        } catch (error) {
            console.error("Error al obtener la información de entrega por user_id:", error);
        }
    };

    const addDeliveryInfo = async (deliveryData) => {
        const token = getToken();
        try {
            await axios.post('http://127.0.0.1:8000/api/delivery-info', {
                ...deliveryData,
                user_id: user.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await fetchDeliveryInfoByUserId(user.id);
        } catch (error) {
            console.error('Error al agregar información de entrega:', error);
        }
    };

    const updateDeliveryInfo = async (id, deliveryData) => {
        try {
            const token = getToken();
            const response = await axios.put(`http://127.0.0.1:8000/api/delivery-info/${id}`, {
                ...deliveryData,
                user_id: user.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) {
                console.log('Información de entrega actualizada:', response.data);
                setDeliveryInfo(response.data);
            } else {
                console.error('Datos de entrega no válidos:', response.data);
            }
        } catch (error) {
            console.error("Error al actualizar la información de entrega:", error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            getInfoClient,
            deliveryInfo,
            addDeliveryInfo,
            updateDeliveryInfo,
            fetchDeliveryInfoByUserId,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
