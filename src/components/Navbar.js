import React from "react";
import { Link } from "react-router-dom";

function Navbar({ userRole, onLoginClick, onLogoutClick, onPreguntaClick }) {
  return (
    <header className="bg-cyan-500 flex justify-between items-center p-4">
      {/* Logo */}
      <div className="bg-white p-2 rounded">
        <img src="/assets/logo.png" alt="Logo" className="h-16" />
      </div>

      {/* Links de navegación (solo si no hay sesión) */}
      {!userRole && (
        <nav className="flex gap-6">
          <Link to="/" className="text-white font-bold hover:text-gray-800">
            Inicio
          </Link>
          <Link to="/nosotros" className="text-white font-bold hover:text-gray-800">
            Nosotros
          </Link>
          <Link to="/servicios" className="text-white font-bold hover:text-gray-800">
            Servicios
          </Link>
        </nav>
      )}

      {/* Botones de sesión y Pregunta */}
      <div className="flex gap-2 items-center">

        {!userRole ? (
          <button
            onClick={onLoginClick}
            className="bg-white text-cyan-500 font-bold px-4 py-2 rounded hover:bg-gray-100"
          >
            Iniciar sesión
          </button>
        ) : (
          <button
            onClick={onLogoutClick}
            className="bg-white text-cyan-500 font-bold px-4 py-2 rounded hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
