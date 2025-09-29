import React, { useState } from "react";

function LoginForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Aquí puedes manejar la autenticación
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-cyan-500 mb-6 text-center">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="mt-1 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="bg-cyan-500 text-white font-bold py-2 rounded hover:bg-cyan-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <a href="#" className="text-cyan-500 hover:underline">
            Crear usuario
          </a>
          <a href="#" className="text-cyan-500 hover:underline">
            Olvidé mi contraseña
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
