import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Login.css'; // Archivo de estilos CSS local

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loggedInUser = await login(email, password);
            if (loggedInUser.is_admin === 1 || loggedInUser.is_admin === 2) {
                navigate('/dashboard');
            } else {
                setError('Access denied: You are not an administrator.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed: Please check your credentials.');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn-login">Login</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default Login;
