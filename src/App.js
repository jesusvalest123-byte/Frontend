import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import LoginForm from "./pages/Login";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-cyan-500 flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
          <div className="bg-white p-2 rounded mb-2 md:mb-0">
            <img src="/assets/logo.png" alt="Logo" className="h-16" />
          </div>
          <nav className="flex gap-6 mb-2 md:mb-0">
            <Link to="/" className="text-white font-bold hover:text-gray-800">Inicio</Link>
            <Link to="/nosotros" className="text-white font-bold hover:text-gray-800">Nosotros</Link>
            <Link to="/servicios" className="text-white font-bold hover:text-gray-800">Servicios</Link>
          </nav>
          <div>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-white text-cyan-500 font-bold px-4 py-2 rounded hover:bg-gray-100"
            >
              Iniciar sesión
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-cyan-500 text-white text-center p-6 mt-auto">
          <p>© 2025 Ikernell. Todos los derechos reservados.</p>
          <p>
            Contacto: contacto@ikernell.com | Tel: +57 300 123 4567
          </p>
        </footer>

        {/* MODAL LOGIN */}
        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      </div>
    </Router>
  );
}

export default App;


