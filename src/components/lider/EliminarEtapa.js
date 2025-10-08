import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EliminarEtapa({ etapa, onBack, onEliminado }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleDelete = async () => {
    setCargando(true);
    try {
      await axios.delete(`http://localhost:8080/api/etapas/${etapa.idEtapa}`);
      toast.success(`🗑️ Etapa "${etapa.nombreEtapa}" eliminada con éxito`, {
        position: "top-right",
        autoClose: 3000,
      });
      setModalAbierto(false);
      if (onEliminado) {
        setTimeout(() => onEliminado(), 3000);
      }
    } catch (error) {
      console.error("Error al eliminar etapa:", error);
      toast.error("❌ Error al eliminar etapa", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto text-center relative">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-red-600 mb-6">Eliminar Etapa</h2>
      <p className="text-gray-700 mb-6">
        ¿Deseas eliminar la etapa{" "}
        <span className="font-bold">{etapa.nombreEtapa}</span>?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
        >
          Sí, eliminar
        </button>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition"
        >
          Cancelar
        </button>
      </div>

      {/* Modal de confirmación */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ Confirmación</h3>
            <p className="mb-6 text-gray-700">
              Esta acción <span className="font-bold">no se puede deshacer</span>. 
              ¿Estás seguro que quieres eliminar la etapa{" "}
              <span className="font-bold">{etapa.nombreEtapa}</span>?
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
                onClick={() => setModalAbierto(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EliminarEtapa;
