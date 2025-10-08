import React from "react";
import { Link } from "react-router-dom";

function Header({ userRole, setUserRole, setShowLogin }) {
  return (
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
        {!userRole ? (
          <button
            className="bg-white text-cyan-500 font-bold px-4 py-2 rounded hover:bg-gray-100"
            onClick={() => setShowLogin(true)}   
          >
            Iniciar sesión
          </button>
        ) : (
          <button
            className="bg-white text-cyan-500 font-bold px-4 py-2 rounded hover:bg-gray-100"
            onClick={() => setUserRole(null)}   
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;

