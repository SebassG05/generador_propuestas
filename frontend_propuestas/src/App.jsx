import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import React, { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Ajustes from './pages/Ajustes.jsx';
import LoginPage from './pages/Login.jsx';
import PoliticaCookies from './pages/PoliticaCookies.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={
            <Suspense fallback={<div>Cargando...</div>}>
              <ResetPassword />
            </Suspense>
          } />
          <Route path="/forgot-password" element={
            <Suspense fallback={<div>Cargando...</div>}>
              <ForgotPassword />
            </Suspense>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/cookies" element={<PoliticaCookies />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const ResetPassword = lazy(() => import('./pages/ResetPassword.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'));

export default App;