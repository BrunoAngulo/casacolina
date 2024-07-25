import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data.user);
            }).catch(error => {
                console.error('Error fetching user:', error);
                localStorage.removeItem('token');
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            if (response.data && response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                return response.data.user;  // Retornar el usuario para verificar si es administrador
            } else {
                console.error('Invalid login data:', response.data);
            }
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Login failed');
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', { name, email, password });
            if (response.data && response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                return response.data.user;
            } else {
                console.error('Invalid registration data:', response.data);
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error('Registration failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
