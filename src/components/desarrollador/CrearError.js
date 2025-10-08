import React, { useState } from "react";
import axios from "axios";

function CrearError({ etapa, usuario, onBack, onCreado }) {
  const [formData, setFormData] = useState({
    tipoError: "",
    descripcion: "",
    fecha: new Date().toISOString().split("T")[0], // fecha actual por defecto
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaSeleccionada = new Date(formData.fecha);
    const inicioEtapa = new Date(etapa.fechaInicio);
    const finEtapa = new Date(etapa.fechaFinal);
    const hoy = new Date();

    // 🧩 Validación de fecha
    if (fechaSeleccionada > hoy) {
      setMensaje("❌ La fecha no puede ser posterior a hoy.");
      return;
    }
    if (fechaSeleccionada < inicioEtapa || fechaSeleccionada > finEtapa) {
      setMensaje(
        `❌ La fecha debe estar dentro del rango de la etapa (${etapa.fechaInicio} - ${etapa.fechaFinal}).`
      );
      return;
    }

    try {
      const data = {
        ...formData,
        idEtapa: etapa.idEtapa,
        idUsuario: usuario.idusuario,
      };

      await axios.post("http://localhost:8080/api/errores", data);
      setMensaje("✅ Error creado correctamente");

      if (onCreado) onCreado();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setMensaje(`❌ ${err.response.data.message}`);
      } else {
        setMensaje("❌ Error al crear el error");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">
        Crear Error
      </h2>

      {mensaje && (
        <p
          className={`text-center mb-4 ${
            mensaje.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensaje}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1">Tipo de Error</label>
          <input
            type="text"
            name="tipoError"
            value={formData.tipoError}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            min={etapa.fechaInicio}
            max={etapa.fechaFinal}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <small className="text-gray-500">
            Rango permitido: {etapa.fechaInicio} - {etapa.fechaFinal}
          </small>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Crear
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

export default CrearError;
