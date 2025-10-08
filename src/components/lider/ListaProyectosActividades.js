import React, { useEffect, useState } from "react";
import axios from "axios";

function ListaProyectosActividades() {
  const [proyectos, setProyectos] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [etapaSeleccionada, setEtapaSeleccionada] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

 
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/proyectos")
      .then((res) => setProyectos(res.data))
      .catch((err) => console.error("Error al obtener proyectos:", err));

    axios
      .get("http://localhost:8080/api/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al obtener usuarios:", err));
  }, []);

  const fetchEtapas = (idProyecto) => {
    setProyectoSeleccionado(idProyecto);
    axios
      .get(`http://localhost:8080/api/etapas?proyectoId=${idProyecto}`)
      .then((res) => setEtapas(res.data))
      .catch((err) => console.error("Error al obtener etapas:", err));
    setActividades([]);
    setEtapaSeleccionada(null);
  };

  const fetchActividades = (etapa) => {
    setEtapaSeleccionada(etapa.idEtapa);
    axios
      .get(`http://localhost:8080/api/actividades?etapaId=${etapa.idEtapa}`)
      .then((res) => setActividades(res.data))
      .catch((err) => console.error("Error al obtener actividades:", err));
  };

  const getNombreDesarrollador = (idDesarrollador) => {
    const dev = usuarios.find((u) => u.idusuario === idDesarrollador);
    return dev ? `${dev.nombre} ${dev.apellido}` : "";
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Proyectos y Etapas
      </h2>

      
      <table className="w-full border border-gray-300 rounded-lg shadow mb-6">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Nombre del Proyecto</th>
            <th className="p-3 border">Descripción</th>
            <th className="p-3 border">Fecha Inicio</th>
            <th className="p-3 border">Fecha Final</th>
            <th className="p-3 border text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.length > 0 ? (
            proyectos.map((proyecto) => (
              <tr
                key={proyecto.id}
                className={`hover:bg-gray-50 ${
                  proyectoSeleccionado === proyecto.id ? "bg-gray-100" : ""
                }`}
              >
                <td className="p-3 border">{proyecto.id}</td>
                <td className="p-3 border">{proyecto.nombreproyecto}</td>
                <td className="p-3 border">{proyecto.descripcion}</td>
                <td className="p-3 border">
                  {proyecto.fechainicio
                    ? new Date(proyecto.fechainicio).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-3 border">
                  {proyecto.fechafinal
                    ? new Date(proyecto.fechafinal).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => fetchEtapas(proyecto.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    📋 Ver Etapas
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500 border">
                No hay proyectos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

     
      {etapas.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">
            Etapas del Proyecto Seleccionado
          </h3>
          <table className="w-full border border-gray-300 rounded-lg shadow mb-6">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Nombre de la Etapa</th>
                <th className="p-3 border">Descripción</th>
                <th className="p-3 border">Fecha Inicio</th>
                <th className="p-3 border">Fecha Final</th>
                <th className="p-3 border text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {etapas.map((etapa) => (
                <tr key={etapa.idEtapa} className="hover:bg-gray-50">
                  <td className="p-3 border">{etapa.idEtapa}</td>
                  <td className="p-3 border">{etapa.nombreEtapa}</td>
                  <td className="p-3 border">{etapa.descripcion}</td>
                  <td className="p-3 border">
                    {etapa.fechaInicio
                      ? new Date(etapa.fechaInicio).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3 border">
                    {etapa.fechaFinal
                      ? new Date(etapa.fechaFinal).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => fetchActividades(etapa)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      ⚙️ Ver Actividades
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

 
      {actividades.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">
            Actividades de la Etapa Seleccionada
          </h3>
          <table className="w-full border border-gray-300 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Nombre</th>
                <th className="p-3 border">Descripción</th>
                <th className="p-3 border">Estado</th>
                <th className="p-3 border">Desarrollador</th>
              </tr>
            </thead>
            <tbody>
              {actividades.map((act) => (
                <tr key={act.idActividad} className="hover:bg-gray-50">
                  <td className="p-3 border">{act.idActividad}</td>
                  <td className="p-3 border">{act.nombreActividad}</td>
                  <td className="p-3 border">{act.descripcion}</td>
                  <td className="p-3 border">{act.estado}</td>
                  <td className="p-3 border">
                    {getNombreDesarrollador(act.idDesarrollador)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {actividades.length === 0 && (
            <p className="text-center py-4 text-gray-500">
              No hay actividades registradas.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ListaProyectosActividades;
