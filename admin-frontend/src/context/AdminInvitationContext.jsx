import React, { createContext, useState } from 'react';
import axios from 'axios';

const AdminInvitationContext = createContext();

const AdminInvitationProvider = ({ children }) => {
    const [message, setMessage] = useState('');

    const sendInvitation = async (email) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/invite', { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error sending invitation:", error);
            setMessage("Error sending invitation.");
        }
    };

    const registerAdmin = async (token, name, password, password_confirmation) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/admin/register', {
                token, name, password, password_confirmation
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error registering admin:", error);
            setMessage("Error registering admin.");
        }
    };

    return (
        <AdminInvitationContext.Provider value={{ message, sendInvitation, registerAdmin }}>
            {children}
        </AdminInvitationContext.Provider>
    );
};

export { AdminInvitationProvider, AdminInvitationContext };
