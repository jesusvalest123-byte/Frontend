import React, { useState, useEffect } from "react";
import axios from "axios";
import EtapasyActividades from "../components/desarrollador/EtapasyActividades";
import GestionErrores from "../components/desarrollador/GestionErrores";
import GestionInterrupciones from "../components/desarrollador/GestionInterrupciones";

function DesarrolladorView({ usuario }) {
  const [vistaActual, setVistaActual] = useState("actividades");
  const [menuOpen, setMenuOpen] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [etapaSeleccionada, setEtapaSeleccionada] = useState(null);
  const [etapasProyecto, setEtapasProyecto] = useState([]);

  // Cargar proyectos del usuario
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/proyectos/por-desarrollador/${usuario.idusuario}`
        );
        setProyectos(res.data);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      }
    };
    fetchProyectos();
  }, [usuario.idusuario]);

  // Cargar etapas del proyecto seleccionado
  useEffect(() => {
    if (!proyectoSeleccionado) {
      setEtapasProyecto([]);
      return;
    }
    const fetchEtapas = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/etapas/by-proyecto/${proyectoSeleccionado.id}`
        );
        setEtapasProyecto(res.data);
      } catch (error) {
        console.error("Error al cargar etapas:", error);
        setEtapasProyecto([]);
      }
    };
    fetchEtapas();
  }, [proyectoSeleccionado]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* PANEL LATERAL */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-cyan-600 text-white flex flex-col p-4 transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Panel del Desarrollador
        </h1>

        <button
          onClick={() => setVistaActual("actividades")}
          className={`text-left p-2 rounded mb-2 ${
            vistaActual === "actividades" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Actividades
        </button>
        <button
          onClick={() => setVistaActual("errores")}
          className={`text-left p-2 rounded mb-2 ${
            vistaActual === "errores" ? "bg-cyan-800" : "hover:bg-cyan-700"
          }`}
        >
          Errores
        </button>
        <button
          onClick={() => setVistaActual("interrupciones")}
          className={`text-left p-2 rounded mb-2 ${
            vistaActual === "interrupciones"
              ? "bg-cyan-800"
              : "hover:bg-cyan-700"
          }`}
        >
          Interrupciones
        </button>

        <button
          onClick={() => setVistaActual("panel")}
          className="text-left p-2 rounded mt-auto bg-cyan-700 hover:bg-cyan-800"
        >
          Volver al Panel Principal
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6 md:ml-0 relative">
        <button
          className="md:hidden mb-4 bg-cyan-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Cerrar Menú" : "Abrir Menú"}
        </button>

        {/* VISTA DE ACTIVIDADES */}
        {vistaActual === "actividades" && (
          <div>
            <h2 className="text-3xl font-bold text-cyan-700 mb-6">
              Tus Proyectos
            </h2>

            {proyectos.length === 0 ? (
              <p className="text-gray-500">No tienes proyectos asignados.</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {proyectos.map((proyecto) => (
                  <li key={proyecto.id} className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {proyecto.nombreproyecto}
                    </h3>
                    <button
                      onClick={() => setProyectoSeleccionado(proyecto)}
                      className={`w-full px-3 py-2 rounded ${
                        proyectoSeleccionado?.id === proyecto.id
                          ? "bg-cyan-700 text-white"
                          : "bg-cyan-500 text-white hover:bg-cyan-600"
                      }`}
                    >
                      Ver Etapas y Actividades
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {proyectoSeleccionado && (
              <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-cyan-700 mb-4 text-center">
                  Etapas del Proyecto: {proyectoSeleccionado.nombreproyecto}
                </h3>

                {etapasProyecto.length > 0 ? (
                  <EtapasyActividades
                    proyecto={proyectoSeleccionado}
                    usuario={usuario}
                    vista="actividades"
                  />
                ) : (
                  <p className="text-gray-500 text-center">
                    Este proyecto aún no tiene etapas registradas.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* VISTA DE ERRORES */}
        {vistaActual === "errores" && proyectoSeleccionado && (
          <div>
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">
              Errores por Etapa ({proyectoSeleccionado.nombreproyecto})
            </h2>
            <ul className="space-y-2">
              {etapasProyecto.length > 0 ? (
                etapasProyecto.map((etapa) => (
                  <li key={etapa.idEtapa}>
                    <button
                      onClick={() => setEtapaSeleccionada(etapa)}
                      className="w-full text-left p-2 rounded bg-cyan-500 hover:bg-cyan-600 text-white mb-2"
                    >
                      {etapa.nombreEtapa}
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">
                  Este proyecto no tiene etapas registradas.
                </p>
              )}
            </ul>

            {etapaSeleccionada && (
              <GestionErrores etapa={etapaSeleccionada} usuario={usuario} />
            )}
          </div>
        )}

        {/* ✅ VISTA DE INTERRUPCIONES IGUAL A ERRORES */}
        {vistaActual === "interrupciones" && proyectoSeleccionado && (
          <div>
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">
              Interrupciones por Etapa ({proyectoSeleccionado.nombreproyecto})
            </h2>
            <ul className="space-y-2">
              {etapasProyecto.length > 0 ? (
                etapasProyecto.map((etapa) => (
                  <li key={etapa.idEtapa}>
                    <button
                      onClick={() => setEtapaSeleccionada(etapa)}
                      className="w-full text-left p-2 rounded bg-cyan-500 hover:bg-cyan-600 text-white mb-2"
                    >
                      {etapa.nombreEtapa}
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">
                  Este proyecto no tiene etapas registradas.
                </p>
              )}
            </ul>

            {etapaSeleccionada && (
              <GestionInterrupciones etapa={etapaSeleccionada} usuario={usuario} />
            )}
          </div>
        )}

        {/* VISTA PRINCIPAL */}
        {vistaActual === "panel" && (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-cyan-700 mb-8">
              Panel Principal
            </h1>
            <p className="text-gray-600">
              Usa el menú lateral para acceder a tus actividades, errores e
              interrupciones.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default DesarrolladorView;
