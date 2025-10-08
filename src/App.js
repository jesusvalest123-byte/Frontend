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
  const [showPregunta, setShowPregunta] = useState(false); // <-- Estado para modal de pregunta
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);

    if (userData.role === "coordinador") navigate("/coordinador");
    if (userData.role === "lider") navigate("/lider");
    if (userData.role === "desarrollador") navigate("/desarrollador");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const rutasPublicas = ["/", "/nosotros", "/servicios"];
    const rutasPrivadas = ["/coordinador", "/lider", "/desarrollador"];

    if (user && rutasPublicas.includes(location.pathname)) handleLogout();
    if (!user && rutasPrivadas.includes(location.pathname)) navigate("/");
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        userRole={user?.role}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
      />

      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={!user ? <Home /> : <Navigate to={`/${user.role}`} />} />
          <Route path="/nosotros" element={!user ? <Nosotros /> : <Navigate to={`/${user.role}`} />} />
          <Route path="/servicios" element={!user ? <Servicios /> : <Navigate to={`/${user.role}`} />} />

          <Route path="/coordinador" element={user?.role === "coordinador" ? <CoordinadorView usuario={user} /> : <Navigate to="/" />} />
          <Route path="/lider" element={user?.role === "lider" ? <LiderView usuario={user} /> : <Navigate to="/" />} />
          <Route path="/desarrollador" element={user?.role === "desarrollador" ? <DesarrolladorView usuario={user} /> : <Navigate to="/" />} />
        </Routes>
      </main>

      {/* Pasamos la función para abrir el modal de pregunta */}
      <Footer onPreguntaClick={() => setShowPregunta(true)} />

      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      
      {/* Modal de pregunta */}
      {showPregunta && <Pregunta onClose={() => setShowPregunta(false)} />}
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
