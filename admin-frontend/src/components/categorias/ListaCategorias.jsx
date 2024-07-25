import React, { useContext, useState } from 'react';
import { CategoriaContext } from '../../context/CategoriaContext';
import './ListaCategorias';

const ListaCategorias = () => {
    const { categorias, createCategoria, updateCategoria, deleteCategoria } = useContext(CategoriaContext);
    const [newCategoria, setNewCategoria] = useState({ nombre: '', icono: null });
    const [editingCategoria, setEditingCategoria] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategoria({ ...newCategoria, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewCategoria({ ...newCategoria, icono: file });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingCategoria({ ...editingCategoria, [name]: value });
    };

    const handleEditFileChange = (e) => {
        const file = e.target.files[0];
        setEditingCategoria({ ...editingCategoria, icono: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCategoria) {
            updateCategoria(editingCategoria.id, editingCategoria);
        } else {
            createCategoria(newCategoria);
        }
        setNewCategoria({ nombre: '', icono: null });
        setEditingCategoria(null);
    };

    const handleEdit = (categoria) => {
        setEditingCategoria(categoria);
    };

    const handleDelete = (id) => {
        deleteCategoria(id);
    };

    return (
        <div className="categoria-container">
            <h2>Lista de Categorías</h2>
            <form className="categoria-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre de la categoría"
                    value={editingCategoria ? editingCategoria.nombre : newCategoria.nombre}
                    onChange={editingCategoria ? handleEditChange : handleInputChange}
                />
                <input
                    type="file"
                    name="icono"
                    onChange={editingCategoria ? handleEditFileChange : handleFileChange}
                />
                <button type="submit" className="submit-button">
                    {editingCategoria ? 'Actualizar' : 'Agregar'}
                </button>
            </form>
            <ul className="categoria-list">
                {categorias.map(categoria => (
                    <li key={categoria.id} className="categoria-item">
                        <span>{categoria.nombre}</span>
                        {categoria.icono && (
                            <img src={`http://localhost:8000/storage/${categoria.icono}`} alt={categoria.nombre} className="categoria-icon" />
                        )}
                        <div className="categoria-actions">
                            <button onClick={() => handleEdit(categoria)} className="edit-button">Editar</button>
                            <button onClick={() => handleDelete(categoria.id)} className="delete-button">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaCategorias;