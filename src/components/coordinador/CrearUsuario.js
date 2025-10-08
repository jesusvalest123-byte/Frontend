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
    estado: "Activo", // ✅ Estado por defecto
    correo: "",
    contrasena: "",
    idRol: "1",
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errorCampo, setErrorCampo] = useState(false);

  // 🔹 Fecha máxima permitida (hace 18 años)
  const fechaMaxima = new Date();
  fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);
  const fechaMaximaISO = fechaMaxima.toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "fechanacimiento") setErrorCampo(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);

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

    // 🧩 Validar edad mínima de 18 años
    const fechaNacimiento = new Date(formData.fechanacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMes = hoy.getMonth() - fechaNacimiento.getMonth();
    const diferenciaDia = hoy.getDate() - fechaNacimiento.getDate();

    if (
      edad < 18 ||
      (edad === 18 && (diferenciaMes < 0 || (diferenciaMes === 0 && diferenciaDia < 0)))
    ) {
      setMensaje("⚠️ El usuario debe tener al menos 18 años.");
      setErrorCampo(true);
      return;
    }

    try {
      const data = new FormData();
      data.append(
        "usuario",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      if (foto) data.append("foto", foto);

      await axios.post("http://localhost:8080/api/usuarios/registro", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMensaje("✅ Usuario creado correctamente");
      setErrorCampo(false);

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
      if (error.response && error.response.data && error.response.data.message) {
        setMensaje(`❌ ${error.response.data.message}`);
      } else {
        setMensaje("❌ Error al crear usuario");
      }
      setErrorCampo(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6 border border-gray-100">
      <h2 className="text-3xl font-extrabold text-cyan-600 mb-6 text-center">
        Crear Usuario 👤
      </h2>

      {mensaje && (
        <div
          className={`mb-5 text-center text-sm font-semibold px-4 py-2 rounded-lg ${
            mensaje.includes("✅")
              ? "bg-green-100 text-green-700 border border-green-300"
              : mensaje.includes("⚠️")
              ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {mensaje}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
          className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="identificacion"
          placeholder="Identificación"
          value={formData.identificacion}
          onChange={handleChange}
          required
          className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500"
        />
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            name="fechanacimiento"
            value={formData.fechanacimiento}
            onChange={handleChange}
            required
            max={fechaMaximaISO}
            className={`border p-3 rounded-xl w-full shadow-sm focus:ring-2 ${
              errorCampo ? "border-red-500 ring-red-300" : "focus:ring-cyan-500"
            }`}
          />
        </div>

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 col-span-1 md:col-span-2"
        />
        <input
          type="text"
          name="profesion"
          placeholder="Profesión"
          value={formData.profesion}
          onChange={handleChange}
          className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          name="especialidad"
          placeholder="Especialidad"
          value={formData.especialidad}
          onChange={handleChange}
          className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
          className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 col-span-1 md:col-span-2"
        />
        <div className="relative col-span-1 md:col-span-2">
          <input
            type={showPassword ? "text" : "password"}
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <select
          name="idRol"
          value={formData.idRol}
          onChange={handleChange}
          className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500"
        >
          <option value="1">Coordinador</option>
          <option value="2">Líder</option>
          <option value="3">Desarrollador</option>
        </select>

        {/* Estado visible pero bloqueado */}
        <input
          type="text"
          name="estado"
          value={formData.estado}
          disabled
          className="border p-3 rounded-xl shadow-sm bg-gray-100 text-gray-600"
        />

        {/* Foto */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-cyan-500"
          />
          {preview && (
            <div className="mt-3 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-cyan-400 shadow-md"
              />
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
          <button
            type="submit"
            className="bg-cyan-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-cyan-700 transition-all shadow-md"
          >
            🚀 Crear Usuario
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-cyan-600 hover:underline font-medium"
          >
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearUsuario;
