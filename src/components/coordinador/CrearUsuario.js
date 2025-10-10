import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CrearUsuario({ onBack }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoIdentificacion: "",
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
  const [cargando, setCargando] = useState(false);

  // Fecha mínima para que tenga al menos 18 años
  const fechaMaxima = new Date();
  fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);
  const fechaMaximaISO = fechaMaxima.toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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


  const validarFrontend = () => {
    const errores = [];


    if (!/^\d+$/.test(formData.identificacion)) {
      errores.push("La identificación debe contener solo números");
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(formData.correo)) {
      errores.push("El correo debe tener un formato válido (ej: usuario@dominio.com)");
    }


    if (formData.contrasena.length < 6) {
      errores.push("La contraseña debe tener al menos 6 caracteres");
    }

    // Edad mínima
    const fechaNacimiento = new Date(formData.fechanacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMes = hoy.getMonth() - fechaNacimiento.getMonth();
    const diferenciaDia = hoy.getDate() - fechaNacimiento.getDate();
    if (
      edad < 18 ||
      (edad === 18 && (diferenciaMes < 0 || (diferenciaMes === 0 && diferenciaDia < 0)))
    ) {
      errores.push("El usuario debe tener al menos 18 años");
    }

    if (errores.length > 0) {
      errores.forEach((msg) => toast.warning(msg));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFrontend()) return;
    setCargando(true);

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

      toast.success("✅ Usuario creado con éxito");
      setFormData({
        nombre: "",
        apellido: "",
        tipoIdentificacion: "",
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

      setTimeout(onBack, 3000);
    } catch (error) {
      console.error("Error al crear usuario:", error);

      let mensaje = "Error al crear usuario";


      if (error.response?.data) {
        const match = error.response.data.match(/"([^"]+)"/);
        if (match && match[1]) {
          mensaje = match[1];
        } else {
          mensaje = error.response.data;
        }
      }

      toast.error(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6 border border-gray-100 relative">
      <ToastContainer position="top-right" autoClose={2500} />
      <h2 className="text-3xl font-extrabold text-cyan-600 mb-6 text-center">
        Crear Usuario 👤
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500" />
        <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500" />

        <select name="tipoIdentificacion" value={formData.tipoIdentificacion} onChange={handleChange} required className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500">
          <option value="">Seleccionar tipo de identificación</option>
          <option value="CC">Cédula de ciudadanía</option>
          <option value="CE">Cédula de extranjería</option>
          <option value="PAS">Pasaporte</option>
        </select>

        <input type="text" name="identificacion" placeholder="Identificación" value={formData.identificacion} onChange={handleChange} required className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500" />

        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Fecha de nacimiento</label>
          <input type="date" name="fechanacimiento" value={formData.fechanacimiento} onChange={handleChange} required max={fechaMaximaISO} className="border p-3 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-cyan-500" />
        </div>

        <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 col-span-1 md:col-span-2" />
        <input type="text" name="profesion" placeholder="Profesión" value={formData.profesion} onChange={handleChange} className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500" />
        <input type="text" name="especialidad" placeholder="Especialidad" value={formData.especialidad} onChange={handleChange} className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500" />
        <input type="text" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} required className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 col-span-1 md:col-span-2" />

        <div className="relative col-span-1 md:col-span-2">
          <input type={showPassword ? "text" : "password"} name="contrasena" placeholder="Contraseña" value={formData.contrasena} onChange={handleChange} required className="border p-3 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-cyan-500" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <select name="idRol" value={formData.idRol} onChange={handleChange} className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500">
          <option value="1">Coordinador</option>
          <option value="2">Líder</option>
          <option value="3">Desarrollador</option>
        </select>

        <input type="text" name="estado" value={formData.estado} disabled className="border p-3 rounded-xl shadow-sm bg-gray-100 text-gray-600" />

        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Foto</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-cyan-500" />
          {preview && (
            <div className="mt-3 flex justify-center">
              <img src={preview} alt="Preview" className="w-32 h-32 rounded-full object-cover border-2 border-cyan-400 shadow-md" />
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
          <button type="submit" disabled={cargando} className="bg-cyan-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-cyan-700 transition-all shadow-md">
            {cargando ? "Creando..." : "🚀 Crear Usuario"}
          </button>
          <button type="button" onClick={onBack} className="text-cyan-600 hover:underline font-medium">
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearUsuario;
