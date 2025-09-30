import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Login from "./pages/Login";
import Formulario from "./pages/Pregunta.JS";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-cyan-500 flex justify-between items-center p-4">
          <div className="bg-white p-2 rounded">
            <img src="/assets/logo.png" alt="Logo" className="h-16" />
          </div>
          <nav className="flex gap-6">
            <Link to="/" className="text-white font-bold hover:text-gray-800">Inicio</Link>
            <Link to="/nosotros" className="text-white font-bold hover:text-gray-800">Nosotros</Link>
            <Link to="/servicios" className="text-white font-bold hover:text-gray-800">Servicios</Link>
          </nav>
          <div>
            <Link to="/login">
              <button className="bg-white text-cyan-500 font-bold px-4 py-2 rounded hover:bg-gray-100">
                Iniciar sesión
              </button>
            </Link>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/login" element={<Login />} />
            <Route path="/formulario" element={<Formulario />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-cyan-500 text-white text-center p-6">
          <p>© 2025 Ikernell. Todos los derechos reservados.</p>
          <p>
            Contacto: contacto@ikernell.com | Tel: +57 300 123 4567 |{" "}
            <Link to="/pregunta" className="underline hover:text-gray-800">Enviar una pregunta</Link>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
