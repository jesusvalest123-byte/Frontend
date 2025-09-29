import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-teal-400 flex justify-between items-center p-4">
      <div className="bg-white p-2 rounded">
        <img src="/assets/logo.png" alt="Logo" className="h-16" />
      </div>
      <nav className="flex gap-6">
        <Link className="text-white hover:text-[#2b3d53]" to="/">Inicio</Link>
        <Link className="text-white hover:text-[#2b3d53]" to="/nosotros">Nosotros</Link>
        <Link className="text-white hover:text-[#2b3d53]" to="/servicios">Servicios</Link>
      </nav>
      <button className="bg-white text-teal-400 px-4 py-2 rounded font-bold hover:bg-gray-100">
        Iniciar sesión
      </button>
    </header>
  );
}

export default Header;
