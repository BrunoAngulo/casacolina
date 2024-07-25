import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import Footer from '../../components/Footer/Footer';
import LoginPopup from '../../components/LoginPopUp/LoginPopup';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css";

function Home() {
    const [menu, setMenu] = useState("home");
    const { platos, category } = useContext(StoreContext);
    const [showLogin, setShowLogin] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(categoryId);
        }
    };

    return (
        <>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
            <Navbar setShowLogin={setShowLogin} />
            <div className="header">
                <div className="header-overlay"></div>
                <div className="header-contents">
                    <h2>Casa Colina</h2>
                    <p>Elevando la Experiencia Gastronómica a Nuevas Alturas</p>
                    <button>Ver Carta</button>
                </div>
            </div>
            <div className="explore-menu" id='explore-menu'>
                <h1>Nuestras categorías</h1>
                <p className='explore-menu-text'>Sumérgete en nuestra amplia selección de categorías gastronómicas, donde cada plato es una experiencia única que deleitará tus sentidos.</p>
                <div className="explore-menu-list">
                    {category.map((item) => (
                        <div
                            onClick={() => handleCategoryClick(item.id)}
                            key={item.id}
                            className='explore-menu-list-item'
                        >
                            <img className={`img_category ${selectedCategory === item.id ? 'active' : ''}`} src={`/${item.icono}.jpg`} alt={item.nombre} />
                            <p>{item.nombre}</p>
                        </div>
                    ))}
                </div>
                <hr />
            </div >
            <div className="food-display" id='food-display'>
                <h2>Lo mejor</h2>
                <div className="food-display-list">
                    {platos.map((item, index) => {
                        if (!selectedCategory || item.categoria_id === selectedCategory) {
                            return (
                                <FoodItem
                                    key={index}
                                    id={item.id}
                                    name={item.nombre}
                                    description={item.descripcion}
                                    price={item.precio}
                                    image={item.imagen}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default Home;
