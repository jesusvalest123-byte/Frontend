import React, { useState, useEffect } from "react";
import axios from "axios";

function ModificarUsuario({ usuario, onBack }) {
  const [formData, setFormData] = useState({ ...usuario });
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (usuario.foto) {
      setFotoPreview(`http://localhost:8080${usuario.foto}`);
    }
  }, [usuario]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(usuario.foto ? `http://localhost:8080${usuario.foto}` : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Crear Blob con JSON de usuario
      data.append(
        "usuario",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      // Agregar foto solo si se seleccionó
      if (fotoFile) data.append("foto", fotoFile);

      await axios.put(
        `http://localhost:8080/api/usuarios/${usuario.idusuario}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMensaje("✅ Usuario modificado correctamente");
      onBack(); // Volver a la lista o pantalla anterior
    } catch (error) {
      console.error("Error al modificar usuario:", error);
      setMensaje("❌ Error al modificar usuario");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
        Modificar Usuario
      </h2>

      {mensaje && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {mensaje}
        </div>
      )}

      <div className="flex justify-center mb-4">
        <img
          src={fotoPreview || "https://via.placeholder.com/150"}
          alt="Foto del usuario"
          className="w-32 h-32 rounded-full object-cover border"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre || ""}
          onChange={handleChange}
          placeholder="Nombre"
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          name="apellido"
          value={formData.apellido || ""}
          onChange={handleChange}
          placeholder="Apellido"
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          name="identificacion"
          value={formData.identificacion || ""}
          onChange={handleChange}
          placeholder="Identificación"
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="date"
          name="fechanacimiento"
          value={formData.fechanacimiento || ""}
          onChange={handleChange}
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          name="direccion"
          value={formData.direccion || ""}
          onChange={handleChange}
          placeholder="Dirección"
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          name="profesion"
          value={formData.profesion || ""}
          onChange={handleChange}
          placeholder="Profesión"
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          name="especialidad"
          value={formData.especialidad || ""}
          onChange={handleChange}
          placeholder="Especialidad"
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="email"
          name="correo"
          value={formData.correo || ""}
          onChange={handleChange}
          placeholder="Correo"
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        />
        <select
          name="estado"
          value={formData.estado || "Activo"}
          onChange={handleChange}
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <select
          name="idRol"
          value={formData.idRol || "1"}
          onChange={handleChange}
          className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
        >
          <option value="1">Coordinador</option>
          <option value="2">Líder</option>
          <option value="3">Desarrollador</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-3 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex-1"
          >
            Guardar cambios
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1"
          >
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModificarUsuario;
