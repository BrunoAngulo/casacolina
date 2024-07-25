import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reservas';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const ListaReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para el formulario de nueva reserva
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/reservations', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setReservas(response.data);
            } catch (error) {
                setError('Error al cargar las reservas');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, []);

    const handleReserve = async (e) => {
        e.preventDefault();
        const newReservation = {
            date,
            time,
            number_of_people: numberOfPeople,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/reservations', newReservation, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Agrega la nueva reserva al estado
            setReservas(prevReservas => [...prevReservas, response.data]);
            // Resetear campos del formulario
            setDate('');
            setTime('');
            setNumberOfPeople('');
        } catch (error) {
            setError('Error al hacer la reserva');
            console.error(error);
        }
    };

    if (loading) {
        return <div className="loading">Cargando reservas...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="reservas-lista-container">
                <h2>Reservas Registradas</h2>
                {reservas.length === 0 ? (
                    <p>No hay reservas registradas.</p>
                ) : (
                    <ul className="reservas-lista">
                        {reservas.map(reserva => (
                            <li key={reserva.id} className="reserva-item">
                                <p><strong>Fecha:</strong> {reserva.date}</p>
                                <p><strong>Hora:</strong> {reserva.time}</p>
                                <p><strong>Número de Personas:</strong> {reserva.number_of_people}</p>
                            </li>
                        ))}
                    </ul>
                )}

                <h2>Hacer Nueva Reserva</h2>
                <form onSubmit={handleReserve} className="reservas-form">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Número de Personas"
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(e.target.value)}
                        required
                    />
                    <button type="submit">Hacer Reserva</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ListaReservas;
