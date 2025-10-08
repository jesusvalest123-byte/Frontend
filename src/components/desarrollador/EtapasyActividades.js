import React, { useState, useEffect } from "react";
import axios from "axios";
import ActividadesDesarrollador from "./ActividadesDesarrollador";
import GestionErrores from "./GestionErrores";
import GestionInterrupciones from "./GestionInterrupciones"; // si ya creaste la vista

function EtapasyActividades({ proyecto, usuario, vista, etapaSeleccionada }) {
  const [etapas, setEtapas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar etapas del proyecto
  useEffect(() => {
    const fetchEtapas = async () => {
      try {
        setCargando(true);
        const res = await axios.get(
          `http://localhost:8080/api/etapas/by-proyecto/${proyecto.id}`
        );
        setEtapas(res.data);
      } catch (error) {
        console.error("Error al cargar etapas:", error);
        setEtapas([]);
      } finally {
        setCargando(false);
      }
    };
    fetchEtapas();
  }, [proyecto.id]);

  if (cargando) return <p>Cargando etapas y actividades...</p>;

  // Vista de errores
  if (vista === "errores" && etapaSeleccionada) {
    return <GestionErrores etapa={etapaSeleccionada} usuario={usuario} />;
  }

  // Vista de interrupciones
  if (vista === "interrupciones" && etapaSeleccionada) {
    return <GestionInterrupciones etapa={etapaSeleccionada} usuario={usuario} />;
  }

  // Vista por defecto: mostrar todas las etapas y sus actividades
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Proyecto: {proyecto.nombreproyecto}
      </h3>

      {etapas.length === 0 && (
        <p className="text-gray-500">Este proyecto no tiene etapas.</p>
      )}

      {etapas.map((etapa) => (
        <div key={etapa.idEtapa} className="mb-4">
          <h4 className="font-semibold text-lg mb-2">{etapa.nombreEtapa}</h4>
          <ActividadesDesarrollador etapa={etapa} usuario={usuario} />
        </div>
      ))}
    </div>
  );
}

export default EtapasyActividades;
