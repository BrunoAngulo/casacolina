import React, { useContext, useState, useEffect } from 'react';
import { CategoriaContext } from '../../context/CategoriaContext';
import './ListaPlatos.css';
import { PlatoContext } from '../../context/PlatoContex';

const ListaPlatos = () => {
    const { platos, createPlato, updatePlato, deletePlato } = useContext(PlatoContext);
    const { categorias, fetchCategorias } = useContext(CategoriaContext);
    const [newPlato, setNewPlato] = useState({ nombre: '', imagen: null, precio: '', descripcion: '', categoria_id: '' });
    const [editingPlato, setEditingPlato] = useState(null);

    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlato({ ...newPlato, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewPlato({ ...newPlato, imagen: file });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingPlato({ ...editingPlato, [name]: value });
    };

    const handleEditFileChange = (e) => {
        const file = e.target.files[0];
        setEditingPlato({ ...editingPlato, imagen: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (editingPlato) {
            formData.append('id', editingPlato.id);
            formData.append('nombre', editingPlato.nombre);
            formData.append('precio', editingPlato.precio);
            formData.append('descripcion', editingPlato.descripcion);
            formData.append('categoria_id', editingPlato.categoria_id);
            if (editingPlato.imagen) {
                formData.append('imagen', editingPlato.imagen, editingPlato.imagen.name);
            }
            await updatePlato(editingPlato.id, formData);
        } else {
            formData.append('nombre', newPlato.nombre);
            formData.append('precio', newPlato.precio);
            formData.append('descripcion', newPlato.descripcion);
            formData.append('categoria_id', newPlato.categoria_id);
            if (newPlato.imagen) {
                formData.append('imagen', newPlato.imagen, newPlato.imagen.name);
            }
            await createPlato(formData);
        }

        setNewPlato({ nombre: '', imagen: null, precio: '', descripcion: '', categoria_id: '' });
        setEditingPlato(null);
    };

    const handleEdit = (plato) => {
        setEditingPlato(plato);
    };

    const handleDelete = async (id) => {
        await deletePlato(id);
    };

    const getCategoriaNombre = (categoria_id) => {
        const categoria = categorias.find(cat => cat.id === categoria_id);
        return categoria ? categoria.nombre : '';
    };

    return (
        <div className="platos-container">
            <h2>Lista de Platos</h2>
            <form className="platos-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del plato"
                    value={editingPlato ? editingPlato.nombre : newPlato.nombre}
                    onChange={editingPlato ? handleEditChange : handleInputChange}
                />
                <input
                    type="file"
                    name="imagen"
                    onChange={editingPlato ? handleEditFileChange : handleFileChange}
                />
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={editingPlato ? editingPlato.precio : newPlato.precio}
                    onChange={editingPlato ? handleEditChange : handleInputChange}
                />
                <input
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    value={editingPlato ? editingPlato.descripcion : newPlato.descripcion}
                    onChange={editingPlato ? handleEditChange : handleInputChange}
                />
                <select
                    name="categoria_id"
                    value={editingPlato ? editingPlato.categoria_id : newPlato.categoria_id}
                    onChange={editingPlato ? handleEditChange : handleInputChange}
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                    ))}
                </select>
                <button type="submit">{editingPlato ? 'Actualizar' : 'Agregar'}</button>
            </form>
            <table className="platos-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {platos.map(plato => (
                        <tr key={plato.id}>
                            <td>{plato.id}</td>
                            <td>{plato.nombre}</td>
                            <td><img src={`http://localhost:8000/storage/${plato.imagen}`} alt={plato.nombre} /></td>
                            <td>{plato.precio}</td>
                            <td>{plato.descripcion}</td>
                            <td>{getCategoriaNombre(plato.categoria_id)}</td>
                            <td>
                                <button onClick={() => handleEdit(plato)}>Editar</button>
                                <button onClick={() => handleDelete(plato.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaPlatos;
