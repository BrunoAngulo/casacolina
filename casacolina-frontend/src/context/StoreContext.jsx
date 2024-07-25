import React, { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import AuthContext from "./AuthContext";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(() => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    });
    const [category, setCategory] = useState([]);
    const [platos, setPlatos] = useState([]);
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/categorias');
                setCategory(data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };
        obtenerCategorias();
    }, []);

    useEffect(() => {
        const obtenerPlatos = async () => {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/comidas');
                setPlatos(data);
            } catch (error) {
                console.error("Error al obtener los platos:", error);
            }
        };
        obtenerPlatos();
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        getOrders();
    }, [user]);

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (!newCart[itemId]) {
                newCart[itemId] = 1;
            } else {
                newCart[itemId] += 1;
            }
            toast.success('Plato agregado al carrito');
            return newCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            toast.error('Plato eliminado del carrito');
            return newCart;
        });
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const item = food_list.find((product) => product.id === itemId);
            return total + (item.price * cartItems[itemId]);
        }, 0);
    };

    const handleSubmitNuevaOrden = async () => {
        try {
            if (!user) {
                throw new Error("Usuario no autenticado");
            }

            const token = localStorage.getItem('token');

            const total = getTotalCartAmount();
            const productos = Object.keys(cartItems).map((comida_id) => ({
                comida_id: Number(comida_id),
                cantidad: cartItems[comida_id],
            }));

            const pedidoData = {
                user_id: user.id,
                total,
                estado: 'en cola',
                productos,
            };

            await axios.post('http://127.0.0.1:8000/api/pedidos', pedidoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCartItems({});
            getOrders();
            localStorage.removeItem('cart');
            toast.success('Pedido realizado correctamente');
        } catch (error) {
            console.error('Error al procesar la nueva orden:', error);
            toast.error('Error al procesar la nueva orden');
        }
    };


    const getOrders = async () => {
        if (!user) return;

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/pedidos/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error al obtener los pedidos del cliente:', error);
        }
    };

    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        getTotalCartAmount,
        category,
        platos,
        handleSubmitNuevaOrden,
        orders,
        getOrders
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
