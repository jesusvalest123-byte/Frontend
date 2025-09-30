import React, { useState, useEffect } from "react";

function ProyectosPanel() {
  const [proyectos, setProyectos] = useState([]);

  const fetchProyectos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/proyectos");
      const data = await res.json();
      setProyectos(data);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Proyectos</h2>
      {proyectos.length === 0 ? (
        <p>No hay proyectos disponibles</p>
      ) : (
        <ul className="list-disc pl-6">
          {proyectos.map((p) => (
            <li key={p.idProyecto}>{p.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProyectosPanel;
