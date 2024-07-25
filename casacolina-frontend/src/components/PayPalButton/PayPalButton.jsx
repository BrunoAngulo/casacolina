import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { StoreContext } from '../../context/StoreContext';

function PayPalButton() {
    const { getTotalCartAmount, handleSubmitNuevaOrden } = useContext(StoreContext);
    const total = getTotalCartAmount();
    const navigate = useNavigate(); // Utiliza useNavigate para obtener la función de navegación
    const clientId = "AVjsuokGrkBKGUijZezemSp2h0sUMAYKSUCeM2B2F2NrHoQ65Gj1-jUM0CZH7UWqS1rcpqplzh6szdzQ";

    const handleApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            // Aquí puedes realizar cualquier acción necesaria después de que el pago se haya aprobado
            // Por ejemplo, enviar la nueva orden
            handleSubmitNuevaOrden()
                .then(() => {
                    // Después de enviar la nueva orden, navega a la página de éxito
                    navigate('/pedidos');
                })
                .catch(error => {
                    // Si hay un error al enviar la nueva orden, puedes manejarlo aquí
                    console.error("Error al procesar la nueva orden:", error);
                    // También puedes mostrar un mensaje de error al usuario si lo deseas
                });
        });
    };

    return (
        <PayPalScriptProvider options={{ "client-id": clientId }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: total.toFixed(2),
                                },
                            },
                        ],
                    });
                }}
                onApprove={handleApprove}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButton;
