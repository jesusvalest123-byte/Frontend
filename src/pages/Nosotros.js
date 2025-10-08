import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pregunta({ onClose, usuario }) {
  const [pregunta, setPregunta] = useState("");
  const [correo, setCorreo] = useState(usuario?.correo || "");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pregunta || !correo) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setCargando(true);
    try {
      const body = {
        pregunta: pregunta,
        correocontacto: correo,
      };

      // Si el usuario está logueado, enviamos el idusuario
      if (usuario?.idusuario) {
        body.idusuario = usuario.idusuario;
      }

      await axios.post("http://localhost:8080/api/preguntas-enviadas", body);

      toast.success("Pregunta enviada correctamente");
      setPregunta("");
      setCorreo(usuario?.correo || "");
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error(error.response || error);
      toast.error("Error al enviar la pregunta");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Enviar una pregunta</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            placeholder="Escribe tu pregunta"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Tu correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
              {cargando ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Pregunta;
