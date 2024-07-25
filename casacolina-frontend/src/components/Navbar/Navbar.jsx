import React, { useContext, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import AuthContext, { useAuth } from '../../context/AuthContext'; // Importa el hook de autenticación

const Navbar = ({ setShowLogin, setMenu, menu }) => {
    const { getTotalCartAmount } = useContext(StoreContext);
    const { user, logout } = useAuth(AuthContext); // Usa el contexto de autenticación


    const handleMenuClick = (menuName) => {
        setMenu(menuName);
    };

    return (
        <div className='navbar'>
            <img src={assets.logo} alt="logotipo" className='logo' />
            <ul className="navbar-menu">
                <li className={`${menu === "home" ? "active" : ""}`} onClick={() => handleMenuClick("home")}>
                    <Link to="/">Home</Link>
                </li>
                <li className={`${menu === "reservas" ? "active" : ""}`} onClick={() => handleMenuClick("reservas")}>
                    <Link to="/reservas">Reservas</Link>
                </li>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {/* Mostrar el botón "Cerrar sesión" si hay un usuario autenticado */}
                {user ? (
                    <>
                        <Link to='/perfil'>Perfil</Link>
                        <Link to='/pedidos'>Pedidos</Link>
                        <button onClick={() => logout()}>Cerrar sesión</button>
                    </>
                ) : (
                    // Mostrar el botón "Entrar" si no hay un usuario autenticado
                    <button onClick={() => setShowLogin(true)}>Entrar</button>
                )}
            </div>
        </div >
    );
};

export default Navbar;
