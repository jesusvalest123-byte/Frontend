import React, { useState, useEffect } from "react";
import axios from "axios";

function ModificarError({ errorEditar, onBack, onActualizado }) {
  const [formData, setFormData] = useState({
    tipoError: "",
    descripcion: "",
    fecha: "",
    idEtapa: "",
    idUsuario: "",
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (errorEditar) {
      setFormData({
        tipoError: errorEditar.tipoError,
        descripcion: errorEditar.descripcion,
        fecha: errorEditar.fecha,
        idEtapa: errorEditar.idEtapa,
        idUsuario: errorEditar.idUsuario,
      });
    }
  }, [errorEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ No enviamos fecha modificada, ya que el backend la mantiene igual
      const data = {
        tipoError: formData.tipoError,
        descripcion: formData.descripcion,
        idEtapa: formData.idEtapa,
        idUsuario: formData.idUsuario,
      };

      await axios.put(
        `http://localhost:8080/api/errores/${errorEditar.idError}`,
        data
      );
      setMensaje("✅ Error actualizado correctamente");
      if (onActualizado) onActualizado();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al actualizar");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">
        Modificar Error
      </h2>
      {mensaje && <p className="text-center mb-4">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label>Tipo de Error</label>
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
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Fecha (solo lectura)</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            disabled
            className="border p-2 rounded w-full bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <input type="hidden" name="idEtapa" value={formData.idEtapa} />
        <input type="hidden" name="idUsuario" value={formData.idUsuario} />

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Guardar Cambios
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

export default ModificarError;
