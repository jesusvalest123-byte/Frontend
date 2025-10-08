import React, { useState, useEffect } from "react";
import axios from "axios";

function ActividadesDesarrollador({ etapa, usuario }) {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        setCargando(true);
        const res = await axios.get(
          `http://localhost:8080/api/actividades/etapa/${etapa.idEtapa}/desarrollador/${usuario.idusuario}`
        );
        setActividades(res.data);
      } catch (error) {
        console.error("Error al cargar actividades:", error);
        setActividades([]);
      } finally {
        setCargando(false);
      }
    };

    fetchActividades();
  }, [etapa.idEtapa, usuario.idusuario]);

  const handleCambiarEstado = async (idActividad, nuevoEstado) => {
    try {
      await axios.put(
        `http://localhost:8080/api/actividades/${idActividad}/estado`,
        null,
        { params: { estado: nuevoEstado } }
      );
      setActividades((prev) =>
        prev.map((act) =>
          act.idActividad === idActividad ? { ...act, estado: nuevoEstado } : act
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  return (
    <div className="border p-4 rounded mb-4 bg-white shadow">
      {cargando ? (
        <p className="text-gray-500">Cargando actividades...</p>
      ) : actividades.length > 0 ? (
        <ul className="space-y-2">
          {actividades.map((act) => (
            <li key={act.idActividad} className="border p-2 rounded bg-gray-50 flex justify-between items-center">
              <div>
                <strong>{act.nombreActividad}</strong> - {act.estado}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleCambiarEstado(act.idActividad, "pendiente")} className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">Pendiente</button>
                <button onClick={() => handleCambiarEstado(act.idActividad, "en progreso")} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">En Progreso</button>
                <button onClick={() => handleCambiarEstado(act.idActividad, "completada")} className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">Completada</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tienes actividades en esta etapa.</p>
      )}
    </div>
  );
}

export default ActividadesDesarrollador;
