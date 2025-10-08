import React, { useState, useEffect } from "react";
import axios from "axios";

function ModificarProyecto({ usuario, proyecto, onBack, onActualizado }) {
  const [formData, setFormData] = useState({
    nombreproyecto: "",
    descripcion: "",
    fechainicio: "",
    fechafinal: "",
    estado: "Activo",
    desarrolladores: [],
  });

  const [mensaje, setMensaje] = useState("");
  const [todosDesarrolladores, setTodosDesarrolladores] = useState([]);

  useEffect(() => {
    // Cargar desarrolladores disponibles
    axios
      .get("http://localhost:8080/api/usuarios")
      .then((res) => {
        const devs = res.data.filter((u) => u.idRol === 3); // solo desarrolladores
        setTodosDesarrolladores(devs);
      })
      .catch((err) => console.error("Error cargando desarrolladores:", err));

    // Inicializar formulario con datos del proyecto
    if (proyecto) {
      setFormData({
        nombreproyecto: proyecto.nombreproyecto || "",
        descripcion: proyecto.descripcion || "",
        fechainicio: proyecto.fechainicio || "",
        fechafinal: proyecto.fechafinal || "",
        estado: proyecto.estado || "Activo",
        desarrolladores: proyecto.desarrolladores || [],
      });
    }
  }, [proyecto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDesarrolladoresChange = (e) => {
    const opciones = Array.from(e.target.selectedOptions);
    const ids = opciones.map((o) => parseInt(o.value));
    setFormData((prev) => ({ ...prev, desarrolladores: ids }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      if (!usuario?.idusuario) throw new Error("Usuario no logueado correctamente");

      const data = {
        ...formData,
        idlider: usuario.idusuario, // asignar líder automáticamente
      };

      await axios.put(`http://localhost:8080/api/proyectos/${proyecto.id}`, data);

      setMensaje("✅ Proyecto actualizado correctamente");

      if (onActualizado) onActualizado();
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
      setMensaje(
        "❌ Error al actualizar proyecto: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">Modificar Proyecto</h2>

      {mensaje && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">{mensaje}</div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-600">Nombre del proyecto</label>
          <input
            type="text"
            name="nombreproyecto"
            value={formData.nombreproyecto}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-600">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Fecha de inicio</label>
          <input
            type="date"
            name="fechainicio"
            value={formData.fechainicio}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Fecha de finalización</label>
          <input
            type="date"
            name="fechafinal"
            value={formData.fechafinal}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-600">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-cyan-500"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-600">Asignar desarrolladores</label>
          <select
            multiple
            value={formData.desarrolladores}
            onChange={handleDesarrolladoresChange}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-cyan-500 h-32"
          >
            {todosDesarrolladores.map((dev) => (
              <option key={dev.idusuario} value={dev.idusuario}>
                {dev.nombre} {dev.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-cyan-600 text-white font-bold py-2 px-4 rounded hover:bg-cyan-700"
          >
            Actualizar Proyecto
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-cyan-600 hover:underline"
          >
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModificarProyecto;
