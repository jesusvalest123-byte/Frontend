import React, { useState, useEffect } from "react";
import axios from "axios";

function CrearActividad({ etapa, usuario, onBack, onCreado }) {
  const [formData, setFormData] = useState({
    nombreActividad: "",
    descripcion: "",
    idDesarrollador: "",
    estado: "Pendiente", 
  });

  const [todosDesarrolladores, setTodosDesarrolladores] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usuarios")
      .then((res) =>
        setTodosDesarrolladores(res.data.filter((u) => u.idRol === 3))
      )
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const data = {
        nombreActividad: formData.nombreActividad,
        descripcion: formData.descripcion,
        idDesarrollador: parseInt(formData.idDesarrollador),
        estado: formData.estado,
        idEtapa: etapa.idEtapa,
      };

      await axios.post("http://localhost:8080/api/actividades", data);
      setMensaje("✅ Actividad creada correctamente");
      if (onCreado) onCreado();
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al crear actividad");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">
        Crear Actividad
      </h2>

      {mensaje && <div className="mb-4 text-center">{mensaje}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1 text-gray-600">Nombre de la actividad</label>
          <input
            type="text"
            name="nombreActividad"
            value={formData.nombreActividad}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Asignar desarrollador</label>
          <select
            name="idDesarrollador"
            value={formData.idDesarrollador}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          >
            <option value="">Selecciona un desarrollador</option>
            {todosDesarrolladores.map((dev) => (
              <option key={dev.idusuario} value={dev.idusuario}>
                {dev.nombre} {dev.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Crear
          </button>
          <button type="button" onClick={onBack} className="text-gray-600 hover:underline">
            ⬅ Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearActividad;
