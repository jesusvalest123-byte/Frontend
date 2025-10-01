import React, { useState } from "react";

function GestionUsuarios({ onBack }) {
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
    rol: "coordinador",
    foto: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setFormData({ ...formData, foto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí envías los datos al backend (fetch/axios)
    console.log("Usuario creado:", formData);

    // Resetear formulario
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
      rol: "coordinador",
      foto: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-cyan-500 mb-6 text-center">
        Gestión de Usuarios
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500"
          required
        />

        {/* Apellido */}
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500"
          required
        />

        {/* Identificación */}
        <input
          type="text"
          name="identificacion"
          placeholder="Identificación"
          value={formData.identificacion}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500"
          required
        />

        {/* Fecha de nacimiento */}
        <input
          type="date"
          name="fechanacimiento"
          value={formData.fechanacimiento}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500"
          required
        />

        {/* Dirección */}
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500 md:col-span-2"
        />

        {/* Profesión */}
        <input
          type="text"
          name="profesion"
          placeholder="Profesión"
          value={formData.profesion}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        />

        {/* Especialidad */}
        <input
          type="text"
          name="especialidad"
          placeholder="Especialidad"
          value={formData.especialidad}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        />

        {/* Rol */}
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        >
          <option value="coordinador">Coordinador</option>
          <option value="lider">Líder</option>
          <option value="desarrollador">Desarrollador</option>
        </select>

        {/* Estado */}
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500"
        >
          <option value="Activo">Activo</option>
          <option value="Inhabilitado">Inhabilitado</option>
        </select>

        {/* Correo */}
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500 md:col-span-2"
          required
        />

        {/* Contraseña */}
        <div className="relative md:col-span-2">
          <input
            type={showPassword ? "text" : "password"}
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-cyan-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Foto */}
        <input
          type="file"
          name="foto"
          onChange={handleChange}
          className="md:col-span-2"
        />

        {/* Botones */}
        <div className="md:col-span-2 flex flex-col sm:flex-row justify-between gap-3 mt-4">
          <button
            type="submit"
            className="bg-cyan-500 text-white font-bold py-3 rounded hover:bg-cyan-600 w-full sm:w-auto"
          >
            Crear Usuario
          </button>

          <button
            type="button"
            onClick={onBack}
            className="text-cyan-500 hover:underline w-full sm:w-auto text-center"
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default GestionUsuarios;
