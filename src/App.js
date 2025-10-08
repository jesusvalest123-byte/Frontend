import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Pregunta from "./pages/Pregunta";
import CoordinadorView from "./pages/CoordinadorView";
import LiderView from "./pages/LiderView";
import DesarrolladorView from "./pages/DesarrolladorView";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPregunta, setShowPregunta] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true); // ✅ evita redirecciones prematuras
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Al cargar la app, revisa si hay sesión guardada
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoadingSession(false); // marca como lista la verificación
  }, []);

  // ✅ Guardar sesión al iniciar
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogin(false);

    if (userData.role === "coordinador") navigate("/coordinador");
    if (userData.role === "lider") navigate("/lider");
    if (userData.role === "desarrollador") navigate("/desarrollador");
  };

  // ✅ Cerrar sesión
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ Control de rutas (solo cuando la sesión ya se verificó)
  useEffect(() => {
    if (loadingSession) return; // no ejecutar mientras carga sesión

    const rutasPrivadas = ["/coordinador", "/lider", "/desarrollador"];

    if (!user && rutasPrivadas.includes(location.pathname)) {
      navigate("/");
    }
  }, [location.pathname, user, loadingSession]);

  if (loadingSession) {
    return <div>Cargando...</div>; // puedes poner un spinner si quieres
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        userRole={user?.role}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
      />

      <main className="flex-1 p-8">
        <Routes>
          <Route
            path="/"
            element={!user ? <Home /> : <Navigate to={`/${user.role}`} />}
          />
          <Route
            path="/nosotros"
            element={!user ? <Nosotros /> : <Navigate to={`/${user.role}`} />}
          />
          <Route
            path="/servicios"
            element={!user ? <Servicios /> : <Navigate to={`/${user.role}`} />}
          />

          <Route
            path="/coordinador"
            element={
              user?.role === "coordinador" ? (
                <CoordinadorView usuario={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/lider"
            element={
              user?.role === "lider" ? (
                <LiderView usuario={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/desarrollador"
            element={
              user?.role === "desarrollador" ? (
                <DesarrolladorView usuario={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </main>

      <Footer onPreguntaClick={() => setShowPregunta(true)} />

      {showLogin && (
        <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}

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
