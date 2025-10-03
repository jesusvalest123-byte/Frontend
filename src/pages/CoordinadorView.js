import React, { useState } from "react";
import GestionUsuarios from "../components/coordinador/GestionUsuarios";

function CoordinadorView({ usuario }) {
  const [activeSection, setActiveSection] = useState("bienvenida");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setMenuOpen(false); // cerrar menú en móvil
  };

  const renderContent = () => {
    switch (activeSection) {
      case "usuarios":
        return <GestionUsuarios />;
      case "proyectos":
        return <h2 className="text-xl font-bold">Gestión de Proyectos</h2>;
      case "preguntas":
        return <Preguntas
      case "reportes":
        return <h2 className="text-xl font-bold">Reportes</h2>;
      default:
        return (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold text-cyan-600">
              👋 Hola, es un gusto tenerte de vuelta
            </h2>
            <p className="text-gray-600 mt-2">
              Selecciona una opción en el menú lateral para comenzar.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-cyan-600 text-white flex flex-col p-4 transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Panel Coordinador</h1>
        <button
          onClick={() => handleSectionChange("usuarios")}
          className={`text-left p-2 rounded mb-2 ${
            activeSection === "usuarios" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Gestión de Usuarios
        </button>
        <button
          onClick={() => handleSectionChange("proyectos")}
          className={`text-left p-2 rounded mb-2 ${
            activeSection === "proyectos" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Gestión de Proyectos
        </button>
          <button
            onClick={()=> handleSectionChange("preguntas")}
            className={`text-left p-2 rounded mb-2 ${
              activeSection === "preguntas" ? "bg-cyan-800" : "hover:bg-cyan-700"
            }`}
        >
          Pregutas
        </button>

        <button
          onClick={() => handleSectionChange("reportes")}
          className={`text-left p-2 rounded mb-2 ${
            activeSection === "reportes" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Reportes
        </button>
      </aside>

      {/* Contenido dinámico */}
      <main className="flex-1 p-6 md:ml-0 relative">
        {/* Botón menú móvil */}
        <button
          className="md:hidden mb-4 bg-cyan-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Cerrar Menú" : "Abrir Menú"}
        </button>

        {renderContent()}
      </main>
    </div>
  );
}

export default CoordinadorView;
