import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EliminarInterrupcion({ interrupcion, onBack, onEliminado }) {
  const [cargando, setCargando] = useState(false);

  const handleDelete = async () => {
    setCargando(true);
    try {
      await axios.delete(`http://localhost:8080/api/interrupciones/${interrupcion.idInterrupcion}`);
      toast.success("🗑️ Interrupción eliminada con éxito");
      setTimeout(onEliminado, 1000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error al eliminar la interrupción");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto text-center">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-red-600 mb-4">Eliminar Interrupción</h2>
      <p className="mb-6">
        ¿Deseas eliminar la interrupción <strong>{interrupcion.tipoInterrupcion}</strong>?
      </p>
      <div className="flex justify-center gap-2">
        <button
          onClick={handleDelete}
          disabled={cargando}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {cargando ? "Eliminando..." : "Sí, eliminar"}
        </button>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default EliminarInterrupcion;
