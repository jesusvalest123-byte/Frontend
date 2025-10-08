import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CrearInterrupcion({ etapa, usuario, onBack, onCreado }) {
  const [tipoInterrupcion, setTipoInterrupcion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [duracion, setDuracion] = useState("");
  const [cargando, setCargando] = useState(false);

  const hoy = new Date().toISOString().split("T")[0]; // Fecha actual
  const fechaInicio = etapa.fechaInicio;
  const fechaFinal = etapa.fechaFinal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      await axios.post("http://localhost:8080/api/interrupciones", {
        tipoInterrupcion,
        descripcion,
        fecha,
        duracion: parseInt(duracion),
        idEtapa: etapa.idEtapa,
        idUsuario: usuario.idusuario,
      });
      toast.success("🟢 Interrupción creada con éxito");
      setTimeout(onCreado, 1000);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "❌ Error al crear la interrupción. Verifique la fecha y los datos."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Crear Interrupción</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Tipo de Interrupción"
          value={tipoInterrupcion}
          onChange={(e) => setTipoInterrupcion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full p-2 border rounded"
          required
          min={fechaInicio} // ✅ No puede ser antes del inicio de la etapa
          max={hoy < fechaFinal ? hoy : fechaFinal} // ✅ No puede ser después de hoy ni del fin de la etapa
        />
        <input
          type="number"
          placeholder="Duración (minutos)"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={cargando}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {cargando ? "Creando..." : "Crear"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearInterrupcion;
