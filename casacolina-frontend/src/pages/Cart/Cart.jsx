
import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import PayPalButton from '../../components/PayPalButton/PayPalButton';
import AuthContext from '../../context/AuthContext';

function Cart() {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, handleSubmitNuevaOrden } = useContext(StoreContext);
    const { user, deliveryInfo } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    useEffect(() => {
        if (deliveryInfo) {
            setFormData({
                firstName: deliveryInfo.first_name || '',
                lastName: deliveryInfo.last_name || '',
                email: deliveryInfo.email || '',
                street: deliveryInfo.street || '',
                city: deliveryInfo.city || '',
                state: deliveryInfo.state || '',
                zipcode: deliveryInfo.zipcode || '',
                country: deliveryInfo.country || '',
                phone: deliveryInfo.phone || ''
            });
        }
    }, [deliveryInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!user) {
                alert("Usuario no autenticado");
                return;
            }
            if (Object.values(formData).some(field => field === '')) {
                alert("Por favor, completa toda la información de entrega.");
                return;
            }

            await handleSubmitNuevaOrden();
            alert("Pedido realizado correctamente");
        } catch (error) {
            alert("Error al realizar el pedido. Por favor, inténtalo de nuevo más tarde.");
            console.error("Error al procesar la nueva orden:", error);
        }
    };

    const handlePaymentSuccess = async () => {
        await handleSubmit();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            <Navbar />
            <div className='cart'>
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Comida</p>
                        <p>Nombre</p>
                        <p>Precio</p>
                        <p>Cantidad</p>
                        <p>Total</p>
                        <p>Eliminar</p>
                    </div>
                    <br />
                    <hr />
                    {food_list.map((item) => {
                        if (cartItems[item.id] > 0) {
                            return (
                                <div key={item.id} className="">
                                    <div className="cart-items-title cart-items-item">
                                        <img src={item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>{item.price}</p>
                                        <p>{cartItems[item.id]}</p>
                                        <p>S/{item.price * cartItems[item.id]}</p>
                                        <p onClick={() => removeFromCart(item.id)} className='cross'>X</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="cart-bottom">
                    <form className="cart-total" onSubmit={handleSubmit} noValidate>
                        <div className="place-order-left">
                            <p className='title'>Delivery Information</p>
                            <div className="cart-total-details">
                                <p>Para cambiar la dirección de entrega, vaya al apartado del Perfil</p>
                            </div>
                            <hr />
                            <br />
                            <input type="text" name='street' placeholder='Street' value={formData.street} readOnly required className='opacity' />
                            <div className="multi-field">
                                <input type="text" name='city' placeholder='City' value={formData.city} readOnly required className='opacity' />
                                <input type="text" name='state' placeholder='State' value={formData.state} readOnly required className='opacity' />
                            </div>
                            <div className="multi-field">
                                <input type="text" name='zipcode' placeholder='Zip code' value={formData.zipcode} readOnly required className='opacity' />
                                <input type="text" name='country' placeholder='Country' value={formData.country} readOnly required className='opacity' />
                            </div>
                            <input type="text" name='phone' placeholder='Phone' value={formData.phone} readOnly required className='opacity' />
                        </div>
                        <h2>Total del carro</h2>
                        <div className="">
                            <div className="cart-total-details">
                                <p>SubTotal</p>
                                <p>{getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Costo por envío</p>
                                <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Total</p>
                                <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
                            </div>
                        </div>

                        <PayPalButton onSuccess={handlePaymentSuccess} />

                    </form>
                    <div className="cart-promocode">
                        <p>Si tienes un código, colócalo</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='Código promocional' />
                            <button>Validar</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
