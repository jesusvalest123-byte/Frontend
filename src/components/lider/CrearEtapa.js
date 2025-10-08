import React, { useState } from "react";
import axios from "axios";

function CrearEtapa({ proyecto, onBack, onCreado }) {
  const [formData, setFormData] = useState({
    nombreEtapa: "",
    descripcion: "",
    fechaInicio: "",
    fechaFinal: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [errorCampo, setErrorCampo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorCampo(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    // 🔹 Validaciones de fechas
    const fechaInicio = new Date(formData.fechaInicio);
    const fechaFinal = new Date(formData.fechaFinal);
    const proyectoInicio = new Date(proyecto.fechainicio);
    const proyectoFinal = new Date(proyecto.fechafinal);

    if (fechaInicio < proyectoInicio || fechaFinal > proyectoFinal) {
      setMensaje(
        `⚠️ La etapa debe estar dentro del rango del proyecto (${proyecto.fechainicio} - ${proyecto.fechafinal}).`
      );
      setErrorCampo(true);
      return;
    }

    if (fechaFinal <= fechaInicio) {
      setMensaje("⚠️ La fecha final debe ser posterior a la fecha de inicio.");
      setErrorCampo(true);
      return;
    }

    try {
      const data = {
        ...formData,
        idProyecto: proyecto.id,
      };

      await axios.post("http://localhost:8080/api/etapas", data);

      setMensaje("✅ Etapa creada correctamente");
      setFormData({
        nombreEtapa: "",
        descripcion: "",
        fechaInicio: "",
        fechaFinal: "",
      });

      if (onCreado) onCreado();
    } catch (error) {
      console.error("Error al crear etapa:", error);
      setMensaje(
        "❌ Error al crear etapa: " + (error.response?.data || error.message)
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6 border border-gray-100">
      <h2 className="text-3xl font-extrabold text-green-600 mb-6 text-center">
        Crear Etapa 📅
      </h2>

      {mensaje && (
        <div
          className={`mb-5 text-center text-sm font-semibold px-4 py-2 rounded-lg ${
            mensaje.includes("✅")
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-yellow-100 text-yellow-700 border border-yellow-300"
          }`}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-700 font-medium">Nombre de la etapa</label>
          <input
            type="text"
            name="nombreEtapa"
            value={formData.nombreEtapa}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl shadow-sm w-full focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-700 font-medium">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="border p-3 rounded-xl shadow-sm w-full focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Fecha de inicio</label>
          <input
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            required
            min={proyecto.fechainicio}
            max={proyecto.fechafinal}
            className={`border p-3 rounded-xl w-full shadow-sm focus:ring-2 ${
              errorCampo ? "border-red-500 ring-red-300" : "focus:ring-green-500"
            }`}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Fecha de finalización</label>
          <input
            type="date"
            name="fechaFinal"
            value={formData.fechaFinal}
            onChange={handleChange}
            required
            min={formData.fechaInicio || proyecto.fechainicio}
            max={proyecto.fechafinal}
            className={`border p-3 rounded-xl w-full shadow-sm focus:ring-2 ${
              errorCampo ? "border-red-500 ring-red-300" : "focus:ring-green-500"
            }`}
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-green-700 transition-all shadow-md"
          >
            🚀 Crear Etapa
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-green-600 hover:underline font-medium"
          >
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearEtapa;
