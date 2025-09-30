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
    // Aquí puedes enviar formData al backend
    console.log("Usuario creado:", formData);
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
    <div>
      <h2 className="text-2xl font-bold text-cyan-500 mb-6 text-center">
        Gestión de Usuarios
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <input
          type="text"
          name="identificacion"
          placeholder="Identificación"
          value={formData.identificacion}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <input
          type="date"
          name="fechanacimiento"
          value={formData.fechanacimiento}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="profesion"
          placeholder="Profesión"
          value={formData.profesion}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="especialidad"
          placeholder="Especialidad"
          value={formData.especialidad}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Rol */}
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="Activo">Activo</option>
          <option value="Inhabilitado">Inhabilitado</option>
        </select>

        {/* Correo y contraseña */}
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
        <input type="file" name="foto" onChange={handleChange} />

        <button
          type="submit"
          className="bg-cyan-500 text-white font-bold py-3 rounded hover:bg-cyan-600 mt-4"
        >
          Crear Usuario
        </button>

        <button
          type="button"
          onClick={onBack}
          className="text-cyan-500 hover:underline mt-2"
        >
          Volver
        </button>
      </form>
    </div>
  );
}

export default GestionUsuarios;
