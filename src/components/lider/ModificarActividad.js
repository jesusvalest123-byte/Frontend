import React, { useState, useEffect } from "react";
import axios from "axios";

function ModificarActividad({ actividadEditar, onBack, onActualizado }) {
  const [formData, setFormData] = useState({
    nombreActividad: "",
    descripcion: "",
    idDesarrollador: "",
    estado: "",
  });

  const [todosDesarrolladores, setTodosDesarrolladores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usuarios")
      .then((res) =>
        setTodosDesarrolladores(res.data.filter((u) => u.idRol === 3))
      )
      .catch((err) => console.error("Error al cargar desarrolladores:", err));

    if (actividadEditar) {
      setFormData({
        nombreActividad: actividadEditar.nombreActividad || "",
        descripcion: actividadEditar.descripcion || "",
        idDesarrollador: actividadEditar.idDesarrollador
          ? actividadEditar.idDesarrollador.toString()
          : "",
        estado: actividadEditar.estado || "Pendiente",
      });
    }
  }, [actividadEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje("");

    try {
      const data = {
        nombreActividad: formData.nombreActividad,
        descripcion: formData.descripcion,
        idDesarrollador: parseInt(formData.idDesarrollador),
        estado: formData.estado,
      };

      const res = await axios.put(
        `http://localhost:8080/api/actividades/${actividadEditar.idActividad}`,
        data
      );

      if (res.status === 200) {
        setMensaje("✅ Actividad actualizada correctamente");
        // Espera un poco antes de volver atrás
        setTimeout(() => {
          if (onActualizado) onActualizado();
        }, 1500);
      } else {
        setMensaje("⚠️ No se pudo actualizar la actividad.");
      }
    } catch (error) {
      console.error("Error al actualizar la actividad:", error);
      setMensaje("❌ Error al actualizar la actividad.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">
        Modificar Actividad
      </h2>

      {mensaje && (
        <div
          className={`mb-4 text-center font-medium ${
            mensaje.includes("✅")
              ? "text-green-600"
              : mensaje.includes("❌")
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1 text-gray-600">
            Nombre de la actividad
          </label>
          <input
            type="text"
            name="nombreActividad"
            value={formData.nombreActividad}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">
            Asignar desarrollador
          </label>
          <select
            name="idDesarrollador"
            value={formData.idDesarrollador}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          >
            <option value="">Selecciona un desarrollador</option>
            {todosDesarrolladores.map((dev) => (
              <option key={dev.idusuario} value={dev.idusuario}>
                {dev.nombre} {dev.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            disabled={guardando}
            className={`${
              guardando
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white py-2 px-4 rounded`}
          >
            {guardando ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:underline"
          >
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModificarActividad;
