import './LoginPopup.css';
import { assets } from '../../assets/assets';
import Alerta from '../Alerta/Alerta';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const LoginPopup = ({ setShowLogin }) => {
    const { register, login, user, setUser } = useAuth();
    const [currState, setCurrState] = useState("Login");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setErrors(["Las contraseñas no coinciden"]);
            return;
        }
        try {
            const response = await register(name, email, password);
            setMessage('Usuario registrado correctamente.');
            setErrors([]);
            setShowLogin(false); // Cerrar el popup después de un registro exitoso
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(Object.values(error.response.data.errors).flat());
            } else {
                console.error('Error desconocido:', error);
                setMessage('Error durante el registro. Por favor, inténtalo de nuevo.');
            }
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            setShowLogin(false); // Cerrar el popup después de un login exitoso
            setMessage('Usuario autenticado correctamente.');
            setErrors([]); // Limpiar los errores después de un login exitoso
        } catch (error) {
            console.error('Error durante el login:', error);
            setMessage('Error durante el login. Por favor, inténtalo de nuevo.');
        }
    };


    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={currState === "Sign Up" ? handleRegisterSubmit : handleLoginSubmit} noValidate>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                {errors.length > 0 && errors.map((error, index) => (
                    <p key={index}><Alerta>{error}</Alerta></p>
                ))}
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id='name'
                            placeholder='Tu nombre'
                            required
                        />
                    )}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id='email'
                        type="email"
                        placeholder='Tu email'
                        required
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id='password'
                        type="password"
                        placeholder='Tu password'
                        required
                    />
                    {currState === "Sign Up" && (
                        <input
                            type='password'
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            id='password_confirmation'
                            placeholder='Repetir password'
                            required
                        />
                    )}
                </div>
                <button type="submit">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>Al continuar, usted está de acuerdo con los términos y condiciones</p>
                </div>
                {currState === "Login" ? (
                    <p>Crear una cuenta <span onClick={() => setCurrState("Sign Up")}>Click aquí</span></p>
                ) : (
                    <p>¿Ya tienes cuenta? <span onClick={() => setCurrState("Login")}>Entra aquí</span></p>
                )}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default LoginPopup;
