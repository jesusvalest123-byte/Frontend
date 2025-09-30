import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Pregunta from "./pages/Pregunta";
import CoordinadorView from "./pages/CoordinadorView";
import LiderView from "./pages/LiderView";
import DesarrolladorView from "./pages/DesarrolladorView";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [userRole, setUserRole] = useState(null); // "coordinador" | "lider" | "desarrollador"
  const navigate = useNavigate();
  const location = useLocation();

  // Maneja login
  const handleLogin = (role) => {
    setUserRole(role);
    setShowLogin(false);

    // Redirigir automáticamente según rol
    if (role === "coordinador") navigate("/coordinador");
    if (role === "lider") navigate("/lider");
    if (role === "desarrollador") navigate("/desarrollador");
  };

  // Maneja logout
  const handleLogout = () => {
    setUserRole(null);
    navigate("/"); // vuelve a página pública
  };

  // Cierra sesión si el usuario navega manualmente a rutas públicas
  useEffect(() => {
    const rutasPublicas = ["/", "/nosotros", "/servicios", "/pregunta"];
    const rutasPrivadas = ["/coordinador", "/lider", "/desarrollador"];

    if (userRole && rutasPublicas.includes(location.pathname)) {
      handleLogout();
    }

    if (!userRole && rutasPrivadas.includes(location.pathname)) {
      navigate("/");
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        userRole={userRole}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
      />

      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={!userRole ? <Home /> : <Navigate to={`/${userRole}`} />} />
          <Route path="/nosotros" element={!userRole ? <Nosotros /> : <Navigate to={`/${userRole}`} />} />
          <Route path="/servicios" element={!userRole ? <Servicios /> : <Navigate to={`/${userRole}`} />} />
          <Route path="/pregunta" element={<Pregunta />} />

          <Route path="/coordinador" element={userRole === "coordinador" ? <CoordinadorView /> : <Navigate to="/" />} />
          <Route path="/lider" element={userRole === "lider" ? <LiderView /> : <Navigate to="/" />} />
          <Route path="/desarrollador" element={userRole === "desarrollador" ? <DesarrolladorView /> : <Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />

      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
