import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PreguntasPanel() {
  const [preguntas, setPreguntas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar todas las preguntas desde el backend
  const fetchPreguntas = async () => {
    setCargando(true);
    try {
      const res = await axios.get("http://localhost:8080/api/preguntas-enviadas");
      setPreguntas(res.data);
    } catch (err) {
      console.error("Error al cargar preguntas:", err);
      toast.error("❌ No se pudieron cargar las preguntas");
      setPreguntas([]);
    } finally {
      setCargando(false);
    }
  };

  // Eliminar pregunta
  const eliminarPregunta = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar esta pregunta?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/preguntas-enviadas/${id}`);
      toast.success("✅ Pregunta eliminada correctamente");
      fetchPreguntas(); // recargar lista
    } catch (err) {
      console.error("Error al eliminar pregunta:", err);
      toast.error("❌ No se pudo eliminar la pregunta");
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Preguntas enviadas</h2>

      {cargando ? (
        <p>Cargando preguntas...</p>
      ) : preguntas.length === 0 ? (
        <p>No hay preguntas registradas.</p>
      ) : (
        <ul className="space-y-4">
          {preguntas.map((p) => (
            <li
              key={p.idpreguntaenviada}
              className="border p-4 rounded bg-gray-50 flex justify-between items-start"
            >
              <div>
                <p>
                  <strong>Pregunta:</strong> {p.pregunta}
                </p>
                <p>
                  <strong>Correo contacto:</strong> {p.correocontacto}
                </p>
                <p>
                  <strong>Fecha envío:</strong> {p.fechaenvio}
                </p>
                <p>
                  <strong>Usuario:</strong> {p.idusuario || "No registrado"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PreguntasPanel;
