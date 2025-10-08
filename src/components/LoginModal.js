import React, { useState } from "react";

function LoginModal({ onLogin, onClose }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/usuarios/login?correo=${correo}&contrasena=${contrasena}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("Credenciales inválidas");

      const data = await response.json();

      if (!data || !data.idRol) throw new Error("Usuario no logueado correctamente");

      let role = "";
      if (data.idRol === 1) role = "coordinador";
      if (data.idRol === 2) role = "lider";
      if (data.idRol === 3) role = "desarrollador";

      
      onLogin({ role, idusuario: data.idusuario, nombre: data.nombre, correo: data.correo });
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-500">Iniciar Sesión</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="border rounded px-4 py-2"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="bg-cyan-500 text-white font-bold px-4 py-2 rounded hover:bg-cyan-600"
          >
            Iniciar sesión
          </button>

          <p className="text-sm text-cyan-500 hover:underline cursor-pointer text-center mt-2">
            ¿Olvidaste tu contraseña?
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
