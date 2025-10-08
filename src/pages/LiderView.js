import React, { useState } from "react";
import GestionProyectos from "../components/lider/GestionProyectos";
import GestionEtapas from "../components/lider/GestionEtapas";
import GestionActividades from "../components/lider/GestionActividades";
import ListaProyectosActividades from "../components/lider/ListaProyectosActividades";
import ReportesLiderPanel from "../components/lider/ReportesLiderPanel";
import TrabajadoresInfo from "../components/TrabajadoresInfo"; // 👈 Nuevo componente

function LiderView({ usuario }) {
  const [vistaActual, setVistaActual] = useState("panel");
  const [menuOpen, setMenuOpen] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [etapaSeleccionada, setEtapaSeleccionada] = useState(null);

  const handleIrAProyectos = () => setVistaActual("proyectos");
  const handleIrAEtapasActividades = () => setVistaActual("listaActividades");
  const handleIrAReportes = () => setVistaActual("reportes");
  const handleIrAServicios = () => setVistaActual("servicios"); // 👈 Nuevo botón

  const handleSeleccionProyecto = (proyecto) => {
    setProyectoSeleccionado(proyecto);
    setVistaActual("etapas");
  };

  const handleSeleccionEtapa = (etapa) => {
    setEtapaSeleccionada(etapa);
    setVistaActual("actividades");
  };

  const handleVolverAProyectos = () => {
    setProyectoSeleccionado(null);
    setVistaActual("proyectos");
  };

  const handleVolverAEtapas = () => {
    setEtapaSeleccionada(null);
    setVistaActual("etapas");
  };

  const handleVolverAPanel = () => {
    setVistaActual("panel");
    setProyectoSeleccionado(null);
    setEtapaSeleccionada(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-cyan-600 text-white flex flex-col p-4 transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Panel del Líder</h1>

        <button
          onClick={handleIrAProyectos}
          className={`text-left p-2 rounded mb-2 ${
            vistaActual === "proyectos" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Proyectos
        </button>

        <button
          onClick={handleIrAEtapasActividades}
          className={`text-left p-2 rounded mb-2 ${
            vistaActual === "listaActividades"
              ? "bg-cyan-800"
              : "hover:bg-cyan-700"
          }`}
        >
          Etapas y Actividades
        </button>

        <button
          onClick={handleIrAReportes}
          className={`text-left p-2 rounded mb-2 ${
            vistaActual === "reportes" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Reportes
        </button>

        <button
          onClick={handleIrAServicios}
          className={`text-left p-2 rounded mb-2 ${
            vistaActual === "servicios" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Servicios
        </button>

        <button
          onClick={handleVolverAPanel}
          className="text-left p-2 rounded mt-auto bg-cyan-700 hover:bg-cyan-800"
        >
          Volver al Panel Principal
        </button>
      </aside>

      <main className="flex-1 p-6 md:ml-0 relative">
        <button
          className="md:hidden mb-4 bg-cyan-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Cerrar Menú" : "Abrir Menú"}
        </button>

        {vistaActual === "panel" && (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-cyan-700 mb-8">
              Panel del Líder
            </h1>
            <p className="text-gray-600">
              Usa el menú lateral para gestionar proyectos, etapas, actividades,
              reportes o servicios.
            </p>
          </div>
        )}

        {vistaActual === "proyectos" && (
          <GestionProyectos
            usuario={usuario}
            onSelectProyecto={handleSeleccionProyecto}
            onBack={handleVolverAPanel}
          />
        )}

        {vistaActual === "listaActividades" && (
          <ListaProyectosActividades onBack={handleVolverAPanel} />
        )}

        {vistaActual === "etapas" && proyectoSeleccionado && (
          <GestionEtapas
            proyecto={proyectoSeleccionado}
            onBack={handleVolverAProyectos}
            onSelectEtapa={handleSeleccionEtapa}
          />
        )}

        {vistaActual === "actividades" && etapaSeleccionada && (
          <GestionActividades
            etapa={etapaSeleccionada}
            usuario={usuario}
            onBack={handleVolverAEtapas}
          />
        )}

        {vistaActual === "reportes" && (
          <ReportesLiderPanel onBack={handleVolverAPanel} />
        )}

        {vistaActual === "servicios" && <TrabajadoresInfo />}
      </main>
    </div>
  );
}

export default LiderView;
