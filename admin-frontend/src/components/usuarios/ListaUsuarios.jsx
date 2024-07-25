import React, { useContext } from 'react';
import { AdminUsuariosContext } from '../../context/AdminUsuariosContext';
import './ListaUsuarios.css'; // Archivo de estilos CSS local

const ListaUsuarios = () => {
    const { usuarios } = useContext(AdminUsuariosContext);

    return (
        <div className="usuarios-container">
            <h2>Lista de Usuarios</h2>
            <ul className="usuarios-list">
                {usuarios.map((usuario) => (
                    <li key={usuario.id} className="usuario-item">
                        <strong>ID:</strong> {usuario.id}<br />
                        <h1></h1>
                        <h1></h1>
                        <strong>Nombre:</strong> {usuario.name}<br />
                        <h1></h1>
                        <strong>Email:</strong> {usuario.email}<br />
                        <h1></h1>
                        <strong>Rol:</strong> {usuario.is_admin ? 'Administrador' : 'Usuario Regular'}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaUsuarios;
