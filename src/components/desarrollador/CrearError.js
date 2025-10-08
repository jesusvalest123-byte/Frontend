import React, { useState } from "react";
import axios from "axios";

function CrearError({ etapa, usuario, onBack, onCreado }) {
  const [formData, setFormData] = useState({
    tipoError: "",
    descripcion: "",
    fecha: new Date().toISOString().split("T")[0], // fecha por defecto hoy
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setMensaje("❌ Error al crear el error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">
        Crear Error
      </h2>
      {mensaje && <p className="text-center mb-4">{mensaje}</p>}
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
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Crear
          </button>
          <button type="button" onClick={onBack} className="text-gray-600 hover:underline">
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearError;
