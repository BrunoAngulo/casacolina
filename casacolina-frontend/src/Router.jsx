import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Galeria from './pages/Galeria/Galeria';
import Restaurante from './pages/Restaurante/Restaurante';
import Reservas from './pages/Reservas/Reservas';
import Cart from './pages/Cart/Cart';
import Pedidos from './pages/Pedidos/Pedidos';
import Perfil from './pages/Profile/Perfil';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/orders',
        element: <PlaceOrder />
    },
    {
        path: '/galeria',
        element: <Galeria />
    },
    {
        path: '/restaurante',
        element: <Restaurante />
    },
    {
        path: '/reservas',
        element: <Reservas />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/pedidos',
        element: <Pedidos />
    }
]);

export default router;
