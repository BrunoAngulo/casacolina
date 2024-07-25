import React, { useState, useEffect } from 'react';
import './Perfil.css';
import Navbar from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function Perfil() {
    const { user, deliveryInfo, fetchDeliveryInfoByUserId, updateDeliveryInfo, addDeliveryInfo } = useAuth();
    const [updatedDelivery, setUpdatedDelivery] = useState({
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    useEffect(() => {
        if (user) {
            fetchDeliveryInfoByUserId(user.id);
        }
    }, [user]);

    useEffect(() => {
        if (deliveryInfo) {
            setUpdatedDelivery(deliveryInfo);
        }
    }, [deliveryInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDelivery((prevDelivery) => ({
            ...prevDelivery,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deliveryId = deliveryInfo ? deliveryInfo.id : null;
        if (deliveryId) {
            await updateDeliveryInfo(deliveryId, updatedDelivery);
        } else {
            await addDeliveryInfo(updatedDelivery);
        }
    };


    return (
        <>
            <Navbar />
            <div className="perfil-container">
                <div className="perfil-form-container">
                    <h3 className="perfil-title">Información del Perfil:</h3>
                    <form>
                        <label className="perfil-label">
                            Nombre:
                            <input type="text" name="name" value={user ? user.name : ''} disabled className="perfil-input" />
                        </label>
                        <label className="perfil-label">
                            Correo:
                            <input type="text" name="email" value={user ? user.email : ''} disabled className="perfil-input" />
                        </label>
                    </form>
                    <h3 className="perfil-title">Información del envío:</h3>
                    <form onSubmit={handleSubmit}>
                        <label className="perfil-label">
                            Calle:
                            <input
                                type="text"
                                name="street"
                                value={updatedDelivery.street}
                                onChange={handleInputChange}
                                className="perfil-input"
                            />
                        </label>
                        <label className="perfil-label">
                            Ciudad:
                            <input
                                type="text"
                                name="city"
                                value={updatedDelivery.city}
                                onChange={handleInputChange}
                                className="perfil-input"
                            />
                        </label>
                        <label className="perfil-label">
                            Estado:
                            <input
                                type="text"
                                name="state"
                                value={updatedDelivery.state}
                                onChange={handleInputChange}
                                className="perfil-input"
                            />
                        </label>
                        <label className="perfil-label">
                            Código Postal:
                            <input
                                type="text"
                                name="zipcode"
                                value={updatedDelivery.zipcode}
                                onChange={handleInputChange}
                                className="perfil-input"
                            />
                        </label>
                        <label className="perfil-label">
                            País:
                            <input
                                type="text"
                                name="country"
                                value={updatedDelivery.country}
                                onChange={handleInputChange}
                                className="perfil-input"
                            />
                        </label>
                        <label className="perfil-label">
                            Teléfono:
                            <input
                                type="text"
                                name="phone"
                                value={updatedDelivery.phone}
                                onChange={handleInputChange}
                                className="perfil-input"
                            />
                        </label>
                        <button type="submit" className="perfil-button">Actualizar Información de Entrega</button>
                    </form>

                </div>
            </div>
        </>
    );
}
