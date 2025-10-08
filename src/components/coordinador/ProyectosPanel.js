import React, { useState, useEffect } from "react";
import axios from "axios";

function ProyectosCoordinador({ onBack }) {
  const [proyectos, setProyectos] = useState([]);
  const [busquedaId, setBusquedaId] = useState("");
  const [resultado, setResultado] = useState(null);
  const [liderId, setLiderId] = useState("");
  const [desarrolladoresIds, setDesarrolladoresIds] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Cargar todos los proyectos al montar el componente
  useEffect(() => {
    fetchProyectos();
    fetchUsuarios();
  }, []);

  const fetchProyectos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/proyectos");
      setProyectos(res.data);
    } catch (error) {
      console.error("Error cargando proyectos:", error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  const handleBuscar = async () => {
    if (!busquedaId.trim()) {
      setResultado(null);
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/proyectos/${busquedaId}`);
      setResultado(res.data);
      setLiderId(res.data.idlider || "");
      setDesarrolladoresIds(res.data.desarrolladores || []);
    } catch (error) {
      alert("❌ Proyecto no encontrado");
      setResultado(null);
    }
  };

  const handleAsignar = async () => {
    if (!resultado) return;

    const data = {
      ...resultado,
      idlider: liderId,
      desarrolladores: desarrolladoresIds,
    };

    try {
      await axios.put(`http://localhost:8080/api/proyectos/${resultado.id}`, data);
      setMensaje("✅ Líder y desarrolladores asignados correctamente");
      fetchProyectos(); // refrescar lista
      setResultado(null);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al asignar");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Panel de Proyectos - Coordinador
      </h2>

      {/* Formulario de búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="number"
          placeholder="Buscar proyecto por ID"
          value={busquedaId}
          onChange={(e) => setBusquedaId(e.target.value)}
          className="border p-3 rounded flex-1 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {mensaje && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {mensaje}
        </div>
      )}

      {/* Mostrar un proyecto por ID */}
      {resultado ? (
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Campo</th>
                <th className="p-3 border">Valor / Asignar</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border font-bold">ID</td>
                <td className="p-3 border">{resultado.id}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border font-bold">Nombre</td>
                <td className="p-3 border">{resultado.nombreproyecto}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border font-bold">Descripción</td>
                <td className="p-3 border">{resultado.descripcion}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border font-bold">Fecha inicio</td>
                <td className="p-3 border">{resultado.fechainicio}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border font-bold">Fecha final</td>
                <td className="p-3 border">{resultado.fechafinal}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border font-bold">Estado</td>
                <td className="p-3 border">{resultado.estado}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border font-bold">Líder</td>
                <td className="p-3 border">
                  <select
                    value={liderId}
                    onChange={(e) => setLiderId(e.target.value)}
                    className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">--Seleccionar líder--</option>
                    {usuarios
                      .filter((u) => u.idRol === 2) // solo líderes
                      .map((u) => (
                        <option key={u.idusuario} value={u.idusuario}>
                          {u.nombre} {u.apellido}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border font-bold">Desarrolladores</td>
                <td className="p-3 border">
                  <select
                    multiple
                    value={desarrolladoresIds}
                    onChange={(e) =>
                      setDesarrolladoresIds(Array.from(e.target.selectedOptions, (opt) => Number(opt.value)))
                    }
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
                  >
                    {usuarios
                      .filter((u) => u.idRol === 3) // solo desarrolladores
                      .map((u) => (
                        <option key={u.idusuario} value={u.idusuario}>
                          {u.nombre} {u.apellido}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={handleAsignar}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Asignar Líder y Desarrolladores
            </button>
            <button
              onClick={() => setResultado(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ⬅ Volver
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Mostrar todos los proyectos */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Nombre</th>
                  <th className="p-3 border">Estado</th>
                  <th className="p-3 border">Líder</th>
                  <th className="p-3 border">Desarrolladores</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{p.id}</td>
                    <td className="p-3 border">{p.nombreproyecto}</td>
                    <td className="p-3 border">{p.estado}</td>
                    <td className="p-3 border">
                      {usuarios.find((u) => u.idusuario === p.idlider)
                        ? `${usuarios.find((u) => u.idusuario === p.idlider).nombre} ${usuarios.find((u) => u.idusuario === p.idlider).apellido}`
                        : "-"}
                    </td>
                    <td className="p-3 border">
                      {p.desarrolladores && p.desarrolladores.length > 0
                        ? p.desarrolladores
                            .map((devId) => {
                              const dev = usuarios.find((u) => u.idusuario === devId);
                              return dev ? `${dev.nombre} ${dev.apellido}` : "";
                            })
                            .join(", ")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    </div>
  );
}

export default ProyectosCoordinador;
