import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { CategoriaProvider } from './context/CategoriaContext';
import { PlatoProvider } from './context/PlatoContex';
import { PedidoProvider } from './context/PedidoContext';
import { AdminUsuariosProvider } from './context/AdminUsuariosContext';
import Login from './components/Login';
import RegisterAdmin from './components/RegisterAdmin';
import { AdminInvitationProvider } from './context/AdminInvitationContext';


const App = () => {
  return (
    <Router>
      <AdminInvitationProvider>

        <CategoriaProvider>
          <PlatoProvider>
            <PedidoProvider>
              <AdminUsuariosProvider>
                <Routes>
                  <Route path="/dashboard/*" element={<Dashboard />} />
                  <Route path="/" element={<Login />} />
                  <Route path="/register-admin/:token" element={<RegisterAdmin />} />
                  {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
                </Routes>
              </AdminUsuariosProvider>
            </PedidoProvider>
          </PlatoProvider>
        </CategoriaProvider>
      </AdminInvitationProvider>
    </Router>
  );
};

export default App;
