import React, { useState, useEffect } from "react";
import axios from "axios";

function ModificarEtapa({ etapa, onBack, onActualizado }) {
  const [formData, setFormData] = useState({
    nombreEtapa: "",
    descripcion: "",
    fechaInicio: "",
    fechaFinal: "",
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (etapa) {
      setFormData({
        nombreEtapa: etapa.nombreEtapa || "",
        descripcion: etapa.descripcion || "",
        fechaInicio: etapa.fechaInicio || "",
        fechaFinal: etapa.fechaFinal || "",
      });
    }
  }, [etapa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      // Enviar idProyecto junto con los demás campos para que el backend no falle
      const data = {
        ...formData,
        idProyecto: etapa.idProyecto,
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

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">Modificar Etapa</h2>

      {mensaje && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">{mensaje}</div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-600">Nombre de la etapa</label>
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
          <label className="block mb-1 text-gray-600">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Fecha de inicio</label>
          <input
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Fecha de finalización</label>
          <input
            type="date"
            name="fechaFinal"
            value={formData.fechaFinal}
            onChange={handleChange}
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
