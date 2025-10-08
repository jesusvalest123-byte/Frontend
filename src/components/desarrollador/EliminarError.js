// src/components/desarrollador/EliminarError.js
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EliminarError({ error, onBack, onEliminado }) {
  const [modalAbierto, setModalAbierto] = useState(true);
  const [cargando, setCargando] = useState(false);

  const handleDelete = async () => {
    setCargando(true);
    try {
      await axios.delete(`http://localhost:8080/api/errores/${error.idError}`);
      toast.success(`🗑️ Error "${error.tipoError}" eliminado con éxito`, {
        position: "top-right",
        autoClose: 3000,
      });
      setModalAbierto(false);
      setTimeout(() => {
        if (onEliminado) onEliminado();
      }, 300);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error al eliminar", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setCargando(false);
    }
  };

  if (!modalAbierto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
        <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ Confirmación</h3>
        <p className="mb-6 text-gray-700">
          Esta acción <span className="font-bold">no se puede deshacer</span>. 
          ¿Seguro que quieres eliminar el error{" "}
          <span className="font-bold">{error.tipoError}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            disabled={cargando}
            className={`bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition ${
              cargando ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {cargando ? "Eliminando..." : "Sí, eliminar"}
          </button>
          <button
            onClick={onBack}
            className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarError;
