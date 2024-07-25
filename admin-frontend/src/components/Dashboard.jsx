import React, { useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import './Dashboard.css';
import ListaCategorias from './categorias/ListaCategorias';
import ListaPlatos from './platos/ListaPlatos';
import ListaUsuarios from './usuarios/ListaUsuarios';
import ListaOrdenes from './ordenes/ListaOrdenes';
import SendInvitation from './SendInvitation';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="dashboard">
            <div className="sidebar">
                <ul>
                    <li><Link to="/dashboard/categorias">Categorías</Link></li>
                    <li><Link to="/dashboard/platos">Platos</Link></li>
                    <li><Link to="/dashboard/ordenes">Órdenes</Link></li>
                    <li><Link to="/dashboard/usuarios">Usuarios</Link></li>
                    {user && user.is_admin === 2 && (
                        <li><Link to="/dashboard/create">Crear Usuarios</Link></li>
                    )}
                </ul>
                <button onClick={logout}>Logout</button>
            </div>
            <div className="content">
                <Routes>
                    <Route path="categorias" element={<ListaCategorias />} />
                    <Route path="platos" element={<ListaPlatos />} />
                    <Route path="ordenes" element={<ListaOrdenes />} />
                    <Route path="usuarios" element={<ListaUsuarios />} />
                    {user && user.is_admin === 2 && (
                        <Route path="create" element={<SendInvitation />} />
                    )}
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
