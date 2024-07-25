import React, { useEffect, useState } from 'react';

import './Orders.css';
import { getPedidos } from '../services/pedidosService';

export default function Orders() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        getPedidos()
            .then(response => {
                setPedidos(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    return (
        <div className="orders-container">
            <h1>Lista de Pedidos</h1>
            {pedidos.length > 0 ? (
                <div className="orders-list">
                    {pedidos.map(pedido => (
                        <div key={pedido.id} className="order-card">
                            <h2>Pedido #{pedido.id}</h2>
                            <p><strong>Usuario ID:</strong> {pedido.user_id}</p>
                            <p><strong>Total:</strong> ${pedido.total}</p>
                            <p><strong>Estado:</strong> {pedido.estado}</p>
                            <h3>Productos:</h3>
                            <ul>
                                {pedido.pedido_productos.map(producto => (
                                    <li key={producto.id}>
                                        {producto.comida.nombre} - Cantidad: {producto.cantidad}
                                    </li>
                                ))}
                            </ul>
                            <div className="order-actions">
                                <button className="btn-update">Actualizar</button>
                                <button className="btn-delete">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay pedidos disponibles.</p>
            )}
        </div>
    );
}
