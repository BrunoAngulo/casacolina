import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Hace más de 20 años, Sebastian siguió un sueño de éxito, tener el Restaurante con las mejores Carnes y Parrillas de Lima. Abriendo así su primer restaurante “Casa Colina” en el emblemático distrito de Surquillo.</p>
                </div>
                <div className="footer-content-center">
                    <h2>Compañía</h2>
                    <ul className="footer-menu">
                        <Link to="/">Home</Link>
                        <Link to="/galeria">Galería</Link>
                        <Link to="/restaurante">Restaurante</Link>
                        <Link to="/reservas">Reservas</Link>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Horarios</h2>
                    <ul>
                        <li>Martes a sábado <br />
                            12pm a 11pm <br />
                            Domingos <br />
                            12pm a 6pm</li>
                        <li>📍Calle Narciso de la Colina 674 - Surquillo</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 © casacolina.com - Todos los derechos reservados     .</p>
        </div>
    )
}

export default Footer
