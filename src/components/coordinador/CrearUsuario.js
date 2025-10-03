import React, { useState } from "react";
import axios from "axios";

function CrearUsuario({ onBack }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    identificacion: "",
    fechanacimiento: "",
    direccion: "",
    profesion: "",
    especialidad: "",
    estado: "Activo",
    correo: "",
    contrasena: "",
    idRol: "1",
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);

    // Mostrar preview de la foto antes de subirla
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // ✅ Enviar el usuario como JSON en la clave "usuario"
      data.append(
        "usuario",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      // Foto opcional
      if (foto) data.append("foto", foto);

      await axios.post("http://localhost:8080/api/usuarios/registro", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMensaje("✅ Usuario creado correctamente");
      setFormData({
        nombre: "",
        apellido: "",
        identificacion: "",
        fechanacimiento: "",
        direccion: "",
        profesion: "",
        especialidad: "",
        estado: "Activo",
        correo: "",
        contrasena: "",
        idRol: "1",
      });
      setFoto(null);
      setPreview(null);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setMensaje("❌ Error al crear usuario");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">
        Crear Usuario
      </h2>

      {mensaje && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="identificacion"
          placeholder="Identificación"
          value={formData.identificacion}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        />
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-600 mb-1">Fecha de nacimiento</label>
          <input
            type="date"
            name="fechanacimiento"
            value={formData.fechanacimiento}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="border p-3 rounded focus:ring-2 focus:ring-cyan-500 col-span-1 md:col-span-2"
        />
        <input
          type="text"
          name="profesion"
          placeholder="Profesión"
          value={formData.profesion}
          onChange={handleChange}
          className="border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="especialidad"
          placeholder="Especialidad"
          value={formData.especialidad}
          onChange={handleChange}
          className="border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:ring-2 focus:ring-cyan-500 col-span-1 md:col-span-2"
        />
        <div className="relative col-span-1 md:col-span-2">
          <input
            type={showPassword ? "text" : "password"}
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <select
          name="idRol"
          value={formData.idRol}
          onChange={handleChange}
          className="border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        >
          <option value="1">Coordinador</option>
          <option value="2">Líder</option>
          <option value="3">Desarrollador</option>
        </select>

        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        {/* Foto */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-600 mb-1">Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-cyan-500"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 rounded-full object-cover border"
            />
          )}
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-cyan-600 text-white font-bold py-2 px-4 rounded hover:bg-cyan-700"
          >
            Crear Usuario
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

export default CrearUsuario;
