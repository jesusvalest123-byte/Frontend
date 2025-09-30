import React, { useState } from "react";
import GestionUsuarios from "../components/coordinador/GestionUsuarios";

function CoordinadorView() {
  const [activeSection, setActiveSection] = useState("usuarios");

  const renderContent = () => {
    switch (activeSection) {
      case "usuarios":
        return <GestionUsuarios />;
      case "proyectos":
        return <h2 className="text-xl font-bold">Gestión de Proyectos</h2>;
      case "reportes":
        return <h2 className="text-xl font-bold">Reportes</h2>;
      default:
        return <h2 className="text-xl font-bold">Bienvenido, Coordinador</h2>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-600 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Panel Coordinador</h1>
        <button
          onClick={() => setActiveSection("usuarios")}
          className={`text-left p-2 rounded mb-2 ${
            activeSection === "usuarios" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Gestión de Usuarios
        </button>
        <button
          onClick={() => setActiveSection("proyectos")}
          className={`text-left p-2 rounded mb-2 ${
            activeSection === "proyectos" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Gestión de Proyectos
        </button>
        <button
          onClick={() => setActiveSection("reportes")}
          className={`text-left p-2 rounded mb-2 ${
            activeSection === "reportes" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Reportes
        </button>
      </aside>

      {/* Contenido dinámico */}
      <main className="flex-1 p-6 bg-gray-100">{renderContent()}</main>
    </div>
  );
}

export default CoordinadorView;
