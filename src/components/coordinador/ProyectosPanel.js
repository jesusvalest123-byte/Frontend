import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProyectosCoordinador({ onBack }) {
  const [proyectos, setProyectos] = useState([]);
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [resultado, setResultado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

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
      toast.error("❌ Error cargando proyectos");
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      toast.error("❌ Error cargando usuarios");
    }
  };

  const handleBuscar = async () => {
    if (!busquedaNombre.trim()) {
      setResultado(null);
      toast.info("🔎 Ingresa un nombre de proyecto para buscar");
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8080/api/proyectos/nombre/${encodeURIComponent(busquedaNombre)}`
      );
      setResultado(res.data);
      toast.success("✅ Proyecto encontrado");
    } catch (error) {
      toast.error("❌ Proyecto no encontrado");
      setResultado(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <ToastContainer position="top-center" autoClose={2500} />
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Panel de Proyectos - Coordinador
      </h2>

      {/* 🔍 Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar proyecto por nombre"
          value={busquedaNombre}
          onChange={(e) => setBusquedaNombre(e.target.value)}
          className="border p-3 rounded flex-1 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {/* 🧾 Resultado de búsqueda */}
      {resultado ? (
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Campo</th>
                <th className="p-3 border">Información</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-bold">Nombre</td>
                <td className="p-3 border">{resultado.nombreproyecto}</td>
              </tr>
              <tr>
                <td className="p-3 border font-bold">Descripción</td>
                <td className="p-3 border">{resultado.descripcion}</td>
              </tr>
              <tr>
                <td className="p-3 border font-bold">Fecha inicio</td>
                <td className="p-3 border">{resultado.fechainicio}</td>
              </tr>
              <tr>
                <td className="p-3 border font-bold">Fecha final</td>
                <td className="p-3 border">{resultado.fechafinal}</td>
              </tr>
              <tr>
                <td className="p-3 border font-bold">Estado</td>
                <td className="p-3 border">{resultado.estado}</td>
              </tr>
              <tr>
                <td className="p-3 border font-bold">Líder</td>
                <td className="p-3 border">
                  {usuarios.find((u) => u.idusuario === resultado.idlider)
                    ? `${usuarios.find((u) => u.idusuario === resultado.idlider).nombre} ${usuarios.find((u) => u.idusuario === resultado.idlider).apellido}`
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="p-3 border font-bold">Desarrolladores</td>
                <td className="p-3 border">
                  {resultado.desarrolladores?.length
                    ? resultado.desarrolladores
                        .map((devId) => {
                          const dev = usuarios.find((u) => u.idusuario === devId);
                          return dev ? `${dev.nombre} ${dev.apellido}` : "";
                        })
                        .join(", ")
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={() => setResultado(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ⬅ Volver
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Nombre</th>
                <th className="p-3 border">Estado</th>
                <th className="p-3 border">Líder</th>
                <th className="p-3 border">Desarrolladores</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{p.nombreproyecto}</td>
                  <td className="p-3 border">{p.estado}</td>
                  <td className="p-3 border">
                    {usuarios.find((u) => u.idusuario === p.idlider)
                      ? `${usuarios.find((u) => u.idusuario === p.idlider).nombre} ${usuarios.find((u) => u.idusuario === p.idlider).apellido}`
                      : "-"}
                  </td>
                  <td className="p-3 border">
                    {p.desarrolladores?.length
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
      )}
    </div>
  );
}

export default ProyectosCoordinador;
