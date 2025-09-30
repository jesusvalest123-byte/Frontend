import React, { useState } from "react";

function CrearUsuario({ onBack, onCreate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("coordinador"); // Valor por defecto
  const [estado, setEstado] = useState("Activo"); // Valor por defecto

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al backend
    const nuevoUsuario = {
      nombre,
      apellido,
      correo,
      fechaNacimiento,
      contrasena,
      rol,
      estado,
    };
    onCreate(nuevoUsuario);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-cyan-500 mb-6 text-center">
        Crear Usuario
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <div>
          <label className="block text-gray-600 mb-1">Fecha de nacimiento</label>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
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

        {/* Selección de rol */}
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="coordinador">Coordinador</option>
          <option value="lider">Líder</option>
          <option value="desarrollador">Desarrollador</option>
        </select>

        {/* Selección de estado */}
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="Activo">Activo</option>
          <option value="Inhabilitado">Inhabilitado</option>
        </select>

        <button
          type="submit"
          className="bg-cyan-500 text-white font-bold py-3 rounded hover:bg-cyan-600 mt-4"
        >
          Crear usuario
        </button>

        <button
          type="button"
          className="text-cyan-500 hover:underline mt-2"
          onClick={onBack}
        >
          Volver
        </button>
      </form>
    </div>
  );
}

export default CrearUsuario;
