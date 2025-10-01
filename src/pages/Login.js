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
      onLogin(user);
    } catch (err) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-cyan-500 text-center mb-6">
          Iniciar Sesión
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="tu@email.com"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="••••••••"
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
      </div>
    </div>
  );
}

export default Login;
