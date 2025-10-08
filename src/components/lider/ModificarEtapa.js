import React, { useState, useEffect } from "react";
import axios from "axios";

function ModificarEtapa({ etapa, proyecto: proyectoProp, onBack, onActualizado }) {
  const [formData, setFormData] = useState({
    nombreEtapa: "",
    descripcion: "",
    fechaInicio: "",
    fechaFinal: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [proyecto, setProyecto] = useState(proyectoProp || null);
  const [cargando, setCargando] = useState(true);

  // Cargar datos de etapa y proyecto
  useEffect(() => {
    if (etapa) {
      setFormData({
        nombreEtapa: etapa.nombreEtapa || "",
        descripcion: etapa.descripcion || "",
        fechaInicio: etapa.fechaInicio || "",
        fechaFinal: etapa.fechaFinal || "",
      });
    }

    if (!proyectoProp && etapa?.idProyecto) {
      axios
        .get(`http://localhost:8080/api/proyectos/${etapa.idProyecto}`)
        .then((res) => setProyecto(res.data))
        .catch((err) => console.error("Error cargando proyecto:", err))
        .finally(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, [etapa, proyectoProp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!proyecto) {
      setMensaje("❌ No se pudo cargar la información del proyecto.");
      return;
    }

    // Validación fechas
    if (!formData.fechaFinal || formData.fechaFinal <= formData.fechaInicio) {
      setMensaje("⚠️ La fecha final debe ser mayor a la fecha de inicio.");
      return;
    }

    if (formData.fechaFinal > proyecto.fechafinal) {
      setMensaje(
        `⚠️ La fecha final no puede superar la fecha de finalización del proyecto (${proyecto.fechafinal}).`
      );
      return;
    }

    try {
      const data = {
        ...formData,
        fechaInicio: formData.fechaInicio, // ❌ no se modifica
        idProyecto: proyecto.id,
      };

      await axios.put(`http://localhost:8080/api/etapas/${etapa.idEtapa}`, data);

      setMensaje("✅ Etapa actualizada correctamente");
      if (onActualizado) onActualizado();
    } catch (error) {
      console.error("Error al actualizar etapa:", error);
      setMensaje(
        "❌ Error al actualizar etapa: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  if (cargando) {
    return <div className="text-center p-4">Cargando datos de la etapa y el proyecto...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">Modificar Etapa</h2>

      {mensaje && (
        <div
          className={`mb-4 text-center text-sm font-medium px-4 py-2 rounded-lg ${
            mensaje.includes("✅")
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-600 font-medium">Nombre de la etapa</label>
          <input
            type="text"
            name="nombreEtapa"
            value={formData.nombreEtapa}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-600 font-medium">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600 font-medium">Fecha de inicio</label>
          <input
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            disabled
            className="border p-3 rounded w-full bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600 font-medium">Fecha de finalización</label>
          <input
            type="date"
            name="fechaFinal"
            value={formData.fechaFinal}
            onChange={handleChange}
            min={formData.fechaInicio}
            max={proyecto.fechafinal}
            required
            className="border p-3 rounded w-full focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-yellow-600 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700"
          >
            Actualizar Etapa
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-yellow-600 hover:underline"
          >
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModificarEtapa;
