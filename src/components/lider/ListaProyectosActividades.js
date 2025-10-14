import React, { useEffect, useState } from "react";
import axios from "axios";

function ListaProyectosActividades() {
  const [proyectos, setProyectos] = useState([]);
  const [etapasPorProyecto, setEtapasPorProyecto] = useState({});
  const [actividadesPorEtapa, setActividadesPorEtapa] = useState({});
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

  const toggleEtapas = (proyectoId) => {
    if (etapasPorProyecto[proyectoId]) {
      // Si ya están cargadas, colapsar
      setEtapasPorProyecto((prev) => ({ ...prev, [proyectoId]: null }));
      setActividadesPorEtapa((prev) => ({ ...prev })); // limpiar actividades
    } else {
      // Cargar etapas del proyecto
      axios
        .get(`http://localhost:8080/api/etapas/by-proyecto/${proyectoId}`)
        .then((res) =>
          setEtapasPorProyecto((prev) => ({ ...prev, [proyectoId]: res.data }))
        )
        .catch(() => setEtapasPorProyecto((prev) => ({ ...prev, [proyectoId]: [] })));
    }
  };

  const toggleActividades = (etapa) => {
    if (actividadesPorEtapa[etapa.idEtapa]) {
      // Colapsar
      setActividadesPorEtapa((prev) => ({ ...prev, [etapa.idEtapa]: null }));
    } else {
      // Cargar actividades de la etapa
      axios
        .get(`http://localhost:8080/api/actividades?etapaId=${etapa.idEtapa}`)
        .then((res) =>
          setActividadesPorEtapa((prev) => ({ ...prev, [etapa.idEtapa]: res.data }))
        )
        .catch(() =>
          setActividadesPorEtapa((prev) => ({ ...prev, [etapa.idEtapa]: [] }))
        );
    }
  };

  const getNombreDesarrollador = (idDesarrollador) => {
    const dev = usuarios.find((u) => u.idusuario === idDesarrollador);
    return dev ? `${dev.nombre} ${dev.apellido}` : "";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Proyectos y Etapas
      </h2>

      <div className="space-y-4">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.id}
            className="border rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            {/* Proyecto */}
            <div
              className="flex justify-between items-center p-4 bg-blue-100 cursor-pointer"
              onClick={() => toggleEtapas(proyecto.id)}
            >
              <div>
                <h3 className="text-xl font-semibold">{proyecto.nombreproyecto}</h3>
                <p className="text-gray-700">{proyecto.descripcion}</p>
              </div>
              <span className="text-2xl">{etapasPorProyecto[proyecto.id] ? "−" : "+"}</span>
            </div>

            {/* Etapas */}
            {etapasPorProyecto[proyecto.id] &&
              etapasPorProyecto[proyecto.id].map((etapa) => (
                <div
                  key={etapa.idEtapa}
                  className="border-t border-gray-200 pl-6 pr-4 py-2"
                >
                  <div
                    className="flex justify-between items-center p-2 bg-blue-50 cursor-pointer rounded"
                    onClick={() => toggleActividades(etapa)}
                  >
                    <div>
                      <h4 className="font-medium">{etapa.nombreEtapa}</h4>
                      <p className="text-gray-600">{etapa.descripcion}</p>
                    </div>
                    <span className="text-xl">
                      {actividadesPorEtapa[etapa.idEtapa] ? "−" : "+"}
                    </span>
                  </div>

                  {/* Actividades */}
                  {actividadesPorEtapa[etapa.idEtapa] &&
                    actividadesPorEtapa[etapa.idEtapa].map((act) => (
                      <div
                        key={act.idActividad}
                        className="pl-4 mt-2 p-2 border-l border-gray-300 bg-gray-50 rounded"
                      >
                        <p>
                          <strong>Nombre:</strong> {act.nombreActividad}
                        </p>
                        <p>
                          <strong>Descripción:</strong> {act.descripcion}
                        </p>
                        <p>
                          <strong>Estado:</strong> {act.estado}
                        </p>
                        <p>
                          <strong>Desarrollador:</strong>{" "}
                          {getNombreDesarrollador(act.idDesarrollador)}
                        </p>
                      </div>
                    ))}
                  {actividadesPorEtapa[etapa.idEtapa] &&
                    actividadesPorEtapa[etapa.idEtapa].length === 0 && (
                      <p className="text-gray-500 pl-4 py-2">No hay actividades.</p>
                    )}
                </div>
              ))}
            {etapasPorProyecto[proyecto.id] &&
              etapasPorProyecto[proyecto.id].length === 0 && (
                <p className="text-gray-500 p-4">No hay etapas.</p>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProyectosActividades;
