import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Galeria from './pages/Galeria/Galeria';
import Restaurante from './pages/Restaurante/Restaurante';
import Reservas from './pages/Reservas/Reservas';
import Cart from './pages/Cart/Cart';
import { AuthContextProvider } from './context/AuthContext';
import Pedidos from './pages/Pedidos/Pedidos';
import Perfil from './pages/Perfil/Perfil';

const App = () => {
  const [menu, setMenu] = useState("home");

  return (
    <>
      < div className='app' >
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route index element={<Home />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/restaurante" element={<Restaurante />} />
          <Route path="/orders" element={<PlaceOrder />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div >
    </>
  )
}

export default App;
