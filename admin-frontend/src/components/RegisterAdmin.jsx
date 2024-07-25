import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterAdmin = () => {
    let { token } = useParams();  // Obtén el parámetro token de la URL
    let navigate = useNavigate();  // Hook para la navegación

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Token from URL:', token);  // Debug: Verifica si el token está llegando correctamente
    }, [token]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!token) {
                throw new Error("Token is undefined or null.");
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match.");
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/register-admin/${token}`, {
                name,
                password,
                password_confirmation: confirmPassword,
            });

            console.log('Registration successful:', response.data);
            // Redirigir al usuario a la pantalla del administrador
            navigate('/dashboard');  // Ajusta la ruta según tu configuración

        } catch (error) {
            console.error('Error registering admin:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Registro de Administrador</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>Registrar</button>
            </form>
        </div>
    );
};

export default RegisterAdmin;
