import React, { useContext } from 'react';
import { PedidoContext } from '../../context/PedidoContext';
import './ListaOrdenes'; // Archivo de estilos CSS local

const ListaPedidos = () => {
    const { pedidos, updatePedido } = useContext(PedidoContext);

    const handleEstadoChange = async (id, event) => {
        const nuevoEstado = event.target.value;
        await updatePedido(id, { estado: nuevoEstado });
    };

    return (
        <div className="pedidos-container">
            <h2>Lista de Pedidos</h2>
            <table className="pedido-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario ID</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Fecha de creación</th>
                        <th>Productos</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.id}</td>
                            <td>{pedido.user_id}</td>
                            <td>${pedido.total}</td>
                            <td>
                                <select value={pedido.estado} onChange={(event) => handleEstadoChange(pedido.id, event)}>
                                    <option value="En cola">En cola</option>
                                    <option value="Enviado">Enviado</option>
                                    <option value="Completado">Completado</option>
                                </select>
                            </td>
                            <td>{pedido.created_at}</td>
                            <td>
                                <ul className="pedido-productos-list">
                                    {pedido.pedido_productos && pedido.pedido_productos.map((producto, index) => (
                                        <li key={producto.id}>
                                            <strong>Comida:</strong> {producto.comida.nombre}<br />
                                            <strong>Cantidad:</strong> {producto.cantidad}<br />
                                            <strong>Precio por unidad:</strong> ${producto.comida.precio}
                                            <hr />
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaPedidos;
