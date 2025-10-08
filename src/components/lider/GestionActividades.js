import React, { useState, useEffect } from "react";
import axios from "axios";
import CrearActividad from "./CrearActividad";
import ModificarActividad from "./ModificarActividad";
import EliminarActividad from "./EliminarActividad";

function GestionActividades({ etapa, usuario, onBack }) {
  const [actividades, setActividades] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [actividadEditar, setActividadEditar] = useState(null);
  const [actividadParaEliminar, setActividadParaEliminar] = useState(null);
  const [todosDesarrolladores, setTodosDesarrolladores] = useState([]);

  useEffect(() => {
    if (!etapa?.idEtapa) return;
    fetchActividades();
    fetchDesarrolladores();
  }, [etapa]);

  const fetchActividades = () => {
    axios
      .get(`http://localhost:8080/api/actividades?etapaId=${etapa.idEtapa}`)
      .then((res) => setActividades(res.data))
      .catch((err) => console.error("Error cargando actividades:", err));
  };

  const fetchDesarrolladores = () => {
    axios
      .get("http://localhost:8080/api/usuarios")
      .then((res) =>
        setTodosDesarrolladores(res.data.filter((u) => u.idRol === 3))
      )
      .catch((err) => console.error("Error cargando desarrolladores:", err));
  };

  const handleCrear = () => {
    setActividadEditar(null);
    setShowForm(true);
  };

  const handleEditar = (actividad) => {
    setActividadEditar(actividad);
    setShowForm(true);
  };

  const handleEliminar = (actividad) => {
    setActividadParaEliminar(actividad);
  };

  const actividadesFiltradas = actividades.filter(
    (a) =>
      a.nombreActividad.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.idActividad.toString().includes(busqueda)
  );

  if (showForm && actividadEditar) {
    return (
      <ModificarActividad
        actividadEditar={actividadEditar}
        onBack={() => {
          setActividadEditar(null);
          setShowForm(false);
          fetchActividades();
        }}
        onActualizado={() => {
          setActividadEditar(null);
          setShowForm(false);
          fetchActividades();
        }}
      />
    );
  }

  if (showForm && !actividadEditar) {
    return (
      <CrearActividad
        etapa={etapa}
        usuario={usuario}
        onBack={() => setShowForm(false)}
        onCreado={() => {
          setShowForm(false);
          fetchActividades();
        }}
      />
    );
  }

  if (actividadParaEliminar) {
    return (
      <EliminarActividad
        actividad={actividadParaEliminar}
        onBack={() => setActividadParaEliminar(null)}
        onEliminado={() => {
          setActividadParaEliminar(null);
          fetchActividades();
        }}
      />
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-600 mb-4 text-center">
        Actividades de la etapa: {etapa?.nombreEtapa || ""}
      </h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por ID o nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 rounded flex-1 focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={handleCrear}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear Actividad
        </button>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ⬅ Volver a Etapas
        </button>
      </div>

      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Descripción</th>
            <th className="p-3 border">Estado</th>
            <th className="p-3 border">Desarrollador</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividadesFiltradas.map((act) => {
            const dev = todosDesarrolladores.find(
              (d) => d.idusuario === act.idDesarrollador
            );
            return (
              <tr key={act.idActividad} className="hover:bg-gray-50">
                <td className="p-3 border">{act.idActividad}</td>
                <td className="p-3 border">{act.nombreActividad}</td>
                <td className="p-3 border">{act.descripcion}</td>
                <td className="p-3 border">{act.estado}</td>
                <td className="p-3 border">
                  {dev ? `${dev.nombre} ${dev.apellido}` : ""}
                </td>
                <td className="p-3 border flex gap-2">
                  <button
                    onClick={() => handleEditar(act)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    ✏️ Modificar
                  </button>
                  <button
                    onClick={() => handleEliminar(act)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GestionActividades;
