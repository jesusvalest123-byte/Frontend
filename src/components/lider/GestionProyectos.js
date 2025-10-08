import React, { useState, useEffect } from "react";
import CrearProyecto from "./CrearProyecto";
import ModificarProyecto from "./ModificarProyecto";
import EliminarProyecto from "./EliminarProyecto";
import axios from "axios";

function GestionProyectos({ usuario, onSelectProyecto }) {
  const [proyectos, setProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [showCrear, setShowCrear] = useState(false);
  const [proyectoEliminar, setProyectoEliminar] = useState(null);

  useEffect(() => {
    fetchProyectos();
  }, []);

  const fetchProyectos = () => {
    axios
      .get("http://localhost:8080/api/proyectos")
      .then((res) => setProyectos(res.data))
      .catch((err) => console.error("Error cargando proyectos:", err));
  };

  const proyectosFiltrados = proyectos.filter(
    (p) =>
      p.nombreproyecto.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.id.toString().includes(busqueda)
  );

  if (showCrear) {
    return (
      <CrearProyecto
        usuario={usuario}
        onBack={() => {
          setShowCrear(false);
          fetchProyectos();
        }}
        onCreado={() => fetchProyectos()}
      />
    );
  }

  if (proyectoSeleccionado) {
    return (
      <ModificarProyecto
        usuario={usuario}
        proyecto={proyectoSeleccionado}
        onBack={() => {
          setProyectoSeleccionado(null);
          fetchProyectos();
        }}
        onActualizado={() => fetchProyectos()}
      />
    );
  }

  if (proyectoEliminar) {
    return (
      <EliminarProyecto
        proyecto={proyectoEliminar}
        onBack={() => {
          setProyectoEliminar(null);
          fetchProyectos();
        }}
      />
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Gestión de Proyectos
      </h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por ID o nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowCrear(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Crear Proyecto
        </button>
      </div>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Descripción</th>
            <th className="p-3 border">Fecha Inicio</th>
            <th className="p-3 border">Fecha Final</th>
            <th className="p-3 border">Estado</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectosFiltrados.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="p-3 border">{p.id}</td>
              <td className="p-3 border">{p.nombreproyecto}</td>
              <td className="p-3 border">{p.descripcion}</td>
              <td className="p-3 border">{p.fechainicio}</td>
              <td className="p-3 border">{p.fechafinal}</td>
              <td className="p-3 border">{p.estado}</td>
              <td className="p-3 border flex gap-2">
                <button
                  onClick={() => setProyectoSeleccionado(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  ✏️ Modificar
                </button>
                <button
                  onClick={() => setProyectoEliminar(p)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  🗑️ Eliminar
                </button>
                <button
                  onClick={() => onSelectProyecto(p)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  📋 Etapas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GestionProyectos;
