import React, { useEffect, useState } from 'react';
import { getCategorias } from '../services/categoriaService';
import { getComidas } from '../services/comidaService';
import { getPedidos } from '../services/pedidosService';
import './List.css'
const Dashboard = () => {
    const [categorias, setCategorias] = useState([]);
    const [comidas, setComidas] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        getCategorias()
            .then(response => setCategorias(response.data))
            .catch(error => console.error('Error fetching categorias:', error));

        getComidas()
            .then(response => setComidas(response.data))
            .catch(error => console.error('Error fetching comidas:', error));

        getPedidos()
            .then(response => setPedidos(response.data))
            .catch(error => console.error('Error fetching pedidos:', error));
    }, []);

    return (
        <div className="dashboard">
            <div className="section">
                <h2>Categorías</h2>
                <ul>
                    {categorias.map(categoria => (
                        <li key={categoria.id}>{categoria.nombre}</li>
                    ))}
                </ul>
            </div>
            <div className="section">
                <h2>Comidas</h2>
                <ul>
                    {comidas.map(comida => (
                        <li key={comida.id}>
                            <img src={comida.imagen} alt={comida.nombre} />
                            <span>{comida.nombre} - ${comida.precio}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="section">
                <h2>Pedidos</h2>
                <ul>
                    {pedidos.map(pedido => (
                        <li key={pedido.id}>
                            <span>Pedido #{pedido.id} - Total: ${pedido.total}</span>
                            <span>Estado: {pedido.estado}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
