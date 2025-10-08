import React, { useState, useEffect } from "react";
import axios from "axios";
import ModificarEtapa from "./ModificarEtapa"; // Componente de modificación
import EliminarEtapa from "./EliminarEtapa";   // Componente de eliminación

function GestionEtapas({ proyecto, onBack, onSelectEtapa }) { // <-- se cambió onGoActividades por onSelectEtapa
  const [etapas, setEtapas] = useState([]);
  const [etapaSeleccionada, setEtapaSeleccionada] = useState(null);
  const [etapaParaEliminar, setEtapaParaEliminar] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Cargar etapas del proyecto
  useEffect(() => {
    if (proyecto?.id) {
      fetchEtapas(proyecto.id);
    }
  }, [proyecto]);

  const fetchEtapas = (idProyecto) => {
    axios
      .get(`http://localhost:8080/api/etapas/by-proyecto/${idProyecto}`)
      .then((res) => setEtapas(res.data))
      .catch((err) => console.error("Error cargando etapas:", err));
  };

  // Manejo de actualización después de modificar o eliminar
  const handleActualizado = () => fetchEtapas(proyecto.id);
  const handleEliminado = () => {
    setEtapaParaEliminar(null);
    fetchEtapas(proyecto.id);
  };

  // Mostrar formulario de modificación
  if (etapaSeleccionada) {
    return (
      <ModificarEtapa
        etapa={etapaSeleccionada}
        onBack={() => setEtapaSeleccionada(null)}
        onActualizado={handleActualizado}
      />
    );
  }

  // Mostrar modal de eliminación
  if (etapaParaEliminar) {
    return (
      <EliminarEtapa
        etapa={etapaParaEliminar}
        onBack={() => setEtapaParaEliminar(null)}
        onEliminado={handleEliminado}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-cyan-600 mb-4 text-center">
        Etapas del proyecto: {proyecto.nombreproyecto}
      </h2>

      {mensaje && <p className="text-center mb-4">{mensaje}</p>}

      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Descripción</th>
            <th className="p-3 border">Inicio</th>
            <th className="p-3 border">Final</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {etapas.map((e) => (
            <tr key={e.idEtapa} className="hover:bg-gray-50">
              <td className="p-3 border">{e.idEtapa}</td>
              <td className="p-3 border">{e.nombreEtapa}</td>
              <td className="p-3 border">{e.descripcion}</td>
              <td className="p-3 border">{e.fechaInicio}</td>
              <td className="p-3 border">{e.fechaFinal}</td>
              <td className="p-3 border flex gap-2">
                <button
                  onClick={() => setEtapaSeleccionada(e)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  ✏️ Modificar
                </button>
                <button
                  onClick={() => setEtapaParaEliminar(e)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  🗑️ Eliminar
                </button>
                <button
                  onClick={() => onSelectEtapa(e)} // <-- corregido, pasa la etapa correcta
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  📝 Actividades
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onBack} className="mt-4 text-cyan-600 hover:underline">
        ⬅ Volver a proyectos
      </button>
    </div>
  );
}

export default GestionEtapas;
