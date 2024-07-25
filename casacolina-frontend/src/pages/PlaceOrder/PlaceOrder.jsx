import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import PayPalButton from '../../components/PayPalButton/PayPalButton';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function PlaceOrder() {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, handleSubmitNuevaOrden } = useContext(StoreContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmitNuevaOrden();
            alert("Pedido realizado correctamente");
        } catch (error) {
            alert("Error al realizar el pedido. Por favor, inténtalo de nuevo más tarde.");
            console.error("Error al procesar la nueva orden:", error);
        }
    };
    return (
        <>
            <Navbar />
            <form className='place-order'>
                <div className="place-order-left">
                    <p className='title'>Delivery Information</p>
                    <div className="multi-field">
                        <input type="text" name='firstName' placeholder='First name' required />
                        <input type="text" name='lastName' placeholder='Last name' required />
                    </div>
                    <input type="email" name='email' placeholder='Email address' required />
                    <input type="text" name='street' placeholder='Street' required />
                    <div className="multi-field">
                        <input type="text" name='city' placeholder='City' required />
                        <input type="text" name='state' placeholder='State' required />
                    </div>
                    <div className="multi-field">
                        <input type="text" name='zipcode' placeholder='Zip code' required />
                        <input type="text" name='country' placeholder='Country' required />
                    </div>
                    <input type="text" name='phone' placeholder='Phone' required />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details"><p>Subtotal</p><p>S/{getTotalCartAmount()}</p></div>
                            <hr />
                            <div className="cart-total-details"><p>Delivery Fee</p><p>S/{getTotalCartAmount() === 0 ? 0 : 2}</p></div>
                            <hr />
                            <div className="cart-total-details"><b>Total</b><b>S/{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b></div>
                        </div>
                    </div>
                    <PayPalButton />
                </div>
            </form>
            <Footer />
        </>
    );
}

export default PlaceOrder;
