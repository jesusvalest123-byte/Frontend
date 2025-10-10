import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModificarUsuario({ usuario, onBack }) {
  const [formData, setFormData] = useState({ ...usuario });
  const [fotoFile, setFotoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setFormData({
        ...usuario,
        tipoIdentificacion:
          usuario.tipoIdentificacion === "Cédula de ciudadanía"
            ? "CC"
            : usuario.tipoIdentificacion === "Cédula de extranjería"
            ? "CE"
            : usuario.tipoIdentificacion === "Pasaporte"
            ? "PAS"
            : usuario.tipoIdentificacion,
      });

      if (usuario.foto) {
        setPreview(`http://localhost:8080${usuario.foto}`);
      }
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFotoFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(usuario.foto ? `http://localhost:8080${usuario.foto}` : null);
    }
  };

  const validarFrontend = () => {
    const errores = [];

    if (!formData.nombre.trim() || !formData.apellido.trim()) {
      errores.push("El nombre y apellido son obligatorios");
    }

    if (!formData.tipoIdentificacion) {
      errores.push("Debes seleccionar un tipo de identificación");
    }

    if (!/^\d+$/.test(formData.identificacion)) {
      errores.push("La identificación debe contener solo números");
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(formData.correo)) {
      errores.push("El correo debe tener un formato válido (ej: usuario@dominio.com)");
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
      data.append("usuario", new Blob([JSON.stringify(formData)], { type: "application/json" }));
      if (fotoFile) data.append("foto", fotoFile);

      await axios.put(
        `http://localhost:8080/api/usuarios/${usuario.idusuario}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("✅ Usuario modificado correctamente");
      setTimeout(onBack, 2000);
    } catch (error) {
      console.error("Error al modificar usuario:", error);
      let mensaje = "Error al modificar usuario";

      if (error.response?.data) {
        const match = error.response.data.match(/"([^"]+)"/);
        if (match && match[1]) mensaje = match[1];
        else mensaje = error.response.data;
      }

      if (mensaje.includes("correo")) {
        toast.warning("⚠️ El correo ya está en uso por otro usuario");
      } else if (mensaje.includes("identificación")) {
        toast.warning("⚠️ El número de identificación ya está registrado por otro usuario");
      } else {
        toast.error(`❌ ${mensaje}`);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6 border border-gray-100 relative">
      <ToastContainer position="top-right" autoClose={2500} />
      <h2 className="text-3xl font-extrabold text-yellow-500 mb-6 text-center">
        Modificar Usuario ✏️
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre || ""}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-400 w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido || ""}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-400 w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Tipo de identificación</label>
          <select
            name="tipoIdentificacion"
            value={formData.tipoIdentificacion || ""}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-400 w-full"
          >
            <option value="">Seleccionar tipo de identificación</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="PAS">Pasaporte</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Identificación</label>
          <input
            type="text"
            name="identificacion"
            value={formData.identificacion || ""}
            onChange={handleChange}
            required
            disabled
            className="border p-3 rounded-xl shadow-sm bg-gray-100 cursor-not-allowed w-full"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Fecha de nacimiento</label>
          <input
            type="date"
            name="fechanacimiento"
            value={formData.fechanacimiento || ""}
            onChange={handleChange}
            required
            disabled
            className="border p-3 rounded-xl w-full shadow-sm bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion || ""}
            onChange={handleChange}
            className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-400 w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Profesión</label>
          <input
            type="text"
            name="profesion"
            value={formData.profesion || ""}
            onChange={handleChange}
            className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-400 w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Especialidad</label>
          <input
            type="text"
            name="especialidad"
            value={formData.especialidad || ""}
            onChange={handleChange}
            className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-400 w-full"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo || ""}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-400 w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Estado</label>
          <select
            name="estado"
            value={formData.estado || "Activo"}
            onChange={handleChange}
            className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-400 w-full"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Rol</label>
          <select
            name="idRol"
            value={formData.idRol || ""}
            onChange={handleChange}
            className="border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-400 w-full"
          >
            <option value="">Seleccionar rol</option>
            <option value="1">Coordinador</option>
            <option value="2">Líder</option>
            <option value="3">Desarrollador</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-yellow-400"
          />
          {preview && (
            <div className="mt-3 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-yellow-400 shadow-md"
              />
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
          <button
            type="submit"
            disabled={cargando}
            className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-xl hover:bg-yellow-600 transition-all shadow-md"
          >
            {cargando ? "Guardando..." : "💾 Guardar Cambios"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-yellow-600 hover:underline font-medium"
          >
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModificarUsuario;
