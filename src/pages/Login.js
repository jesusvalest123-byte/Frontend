import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/usuarios/login", null, {
        params: { correo, contrasena },
      });

      const user = res.data;
      onLogin(user.rol.nombre.toLowerCase()); // Coordinador → "coordinador"
    } catch (err) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Correo</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-cyan-500 text-white py-2 rounded-lg font-bold hover:bg-cyan-600 transition"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
