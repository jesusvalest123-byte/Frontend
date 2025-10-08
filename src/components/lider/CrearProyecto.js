import React, { useState, useEffect } from "react";
import axios from "axios";

function CrearProyecto({ usuario, onBack, onCreado }) {
  const [formData, setFormData] = useState({
    nombreproyecto: "",
    descripcion: "",
    fechainicio: "",
    fechafinal: "",
    estado: "Activo",
    desarrolladores: [],
  });

  const [mensaje, setMensaje] = useState("");
  const [errorCampo, setErrorCampo] = useState(false);
  const [todosDesarrolladores, setTodosDesarrolladores] = useState([]);


  const hoyISO = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usuarios")
      .then((res) => {
        const devs = res.data.filter((u) => u.idRol === 3);
        setTodosDesarrolladores(devs);
      })
      .catch((err) => console.error("Error cargando desarrolladores:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "fechainicio") setErrorCampo(false);
  };

  const handleDesarrolladoresChange = (e) => {
    const opciones = Array.from(e.target.selectedOptions);
    const ids = opciones.map((o) => parseInt(o.value));
    setFormData((prev) => ({ ...prev, desarrolladores: ids }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

   
    if (formData.fechainicio < hoyISO) {
      setMensaje("⚠️ La fecha de inicio no puede ser anterior a hoy.");
      setErrorCampo(true);
      return;
    }


    if (formData.fechafinal <= formData.fechainicio) {
      setMensaje("⚠️ La fecha final debe ser estrictamente posterior a la fecha de inicio.");
      setErrorCampo(true);
      return;
    }

    try {
      if (!usuario?.idusuario) throw new Error("Usuario no logueado correctamente");

      const data = {
        ...formData,
        idlider: usuario.idusuario,
      };

      await axios.post("http://localhost:8080/api/proyectos", data);

      setMensaje("✅ Proyecto creado correctamente");
      setErrorCampo(false);

      setFormData({
        nombreproyecto: "",
        descripcion: "",
        fechainicio: "",
        fechafinal: "",
        estado: "Activo",
        desarrolladores: [],
      });

      if (onCreado) onCreado();
    } catch (error) {
      console.error("Error al crear proyecto:", error);
      setMensaje(
        "❌ Error al crear proyecto: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6 border border-gray-100">
      <h2 className="text-3xl font-extrabold text-cyan-600 mb-6 text-center">
        Crear Proyecto 📁
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-700 font-medium">Nombre del proyecto</label>
          <input
            type="text"
            name="nombreproyecto"
            value={formData.nombreproyecto}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl shadow-sm w-full focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-700 font-medium">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl shadow-sm w-full focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Fecha de inicio</label>
          <input
            type="date"
            name="fechainicio"
            value={formData.fechainicio}
            onChange={handleChange}
            required
            min={hoyISO}
            className={`border p-3 rounded-xl w-full shadow-sm focus:ring-2 ${
              errorCampo ? "border-red-500 ring-red-300" : "focus:ring-cyan-500"
            }`}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Fecha de finalización</label>
          <input
            type="date"
            name="fechafinal"
            value={formData.fechafinal}
            onChange={handleChange}
            required
            min={
              formData.fechainicio
                ? new Date(new Date(formData.fechainicio).getTime() + 86400000)
                    .toISOString()
                    .split("T")[0]
                : hoyISO
            }
            className="border p-3 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-700 font-medium">Estado</label>
          <input
            type="text"
            value="Activo"
            disabled
            className="border p-3 rounded-xl shadow-sm w-full bg-gray-100 text-gray-600"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-gray-700 font-medium">Asignar desarrolladores</label>
          <select
            multiple
            value={formData.desarrolladores}
            onChange={handleDesarrolladoresChange}
            className="border p-3 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-cyan-500 h-32"
          >
            {todosDesarrolladores.map((dev) => (
              <option key={dev.idusuario} value={dev.idusuario}>
                {dev.nombre} {dev.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
          <button
            type="submit"
            className="bg-cyan-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-cyan-700 transition-all shadow-md"
          >
            🚀 Crear Proyecto
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

export default CrearProyecto;
