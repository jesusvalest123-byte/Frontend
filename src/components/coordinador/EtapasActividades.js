import React, { useState, useEffect } from "react";

function EtapasActividades() {
  const [etapas, setEtapas] = useState([]);

  const fetchEtapas = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/etapas");
      const data = await res.json();
      setEtapas(data);
    } catch (error) {
      console.error("Error al cargar etapas:", error);
    }
  };

  useEffect(() => {
    fetchEtapas();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Etapas y Actividades</h2>
      {etapas.length === 0 ? (
        <p>No hay etapas disponibles</p>
      ) : (
        etapas.map((etapa) => (
          <div key={etapa.idEtapa} className="mb-4">
            <h3 className="font-semibold">{etapa.nombreEtapa}</h3>
            <ul className="pl-4 list-disc">
              {etapa.actividades?.map((act) => (
                <li key={act.idActividad}>{act.nombreactividad}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default EtapasActividades;
