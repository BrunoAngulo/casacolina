import React, { useState, useContext } from 'react';
import { AdminInvitationContext } from '../context/AdminInvitationContext';
import './SendInvitation.css'; // Archivo de estilos CSS local

const SendInvitation = () => {
    const [email, setEmail] = useState('');
    const { sendInvitation, message } = useContext(AdminInvitationContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendInvitation(email);
        setEmail('');
    };

    return (
        <div className="send-invitation-container">
            <h2>Enviar Invitación de Admin</h2>
            <form className="send-invitation-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo del nuevo admin"
                    required
                />
                <button type="submit">Enviar Invitación</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default SendInvitation;
