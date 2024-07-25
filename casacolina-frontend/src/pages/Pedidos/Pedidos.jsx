import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Pedidos.css'; // Importa el archivo CSS para los estilos del componente
import Navbar from '../../components/Navbar/Navbar';

export default function Pedidos() {
    const { orders, getOrders } = useContext(StoreContext);

    useEffect(() => {
        getOrders();
    }, [getOrders]);

    return (
        <>
            <Navbar />
            <div className="pedidos-container"> {/* Agrega una clase al contenedor principal */}
                <h2 className="pedidos-title">Historial de Pedidos</h2> {/* Agrega una clase al título */}
                {orders && orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className="pedido-item"> {/* Agrega una clase al elemento de cada pedido */}
                            <p className="pedido-id">ID del Pedido: {order.id}</p> {/* Agrega una clase al texto */}
                            <p className="pedido-total">Total: {order.total}</p> {/* Agrega una clase al texto */}
                            <p className="pedido-estado">Estado: {order.estado}</p> {/* Agrega una clase al texto */}
                            <p className="pedido-productos">Productos:</p> {/* Agrega una clase al texto */}
                            <ul className="productos-lista"> {/* Agrega una clase a la lista de productos */}
                                {order.productos && order.productos.map(producto => (
                                    <li key={producto.id} className="producto-item"> {/* Agrega una clase a cada elemento de producto */}
                                        <p className="producto-nombre">Nombre: {producto.comida?.nombre}</p> {/* Agrega una clase al texto */}
                                        <p className="producto-cantidad">Cantidad: {producto.cantidad}</p> {/* Agrega una clase al texto */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No hay pedidos disponibles.</p>
                )}
            </div>
        </>
    );
}
