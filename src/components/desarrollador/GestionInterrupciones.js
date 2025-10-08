import React, { useState, useEffect } from "react";
import axios from "axios";
import CrearInterrupcion from "./CrearInterrupcion";
import ModificarInterrupcion from "./ModificarInterrupcion";
import EliminarInterrupcion from "./EliminarInterrupcion";

function GestionInterrupciones({ etapa, usuario }) {
  const [interrupciones, setInterrupciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [interrupcionEditar, setInterrupcionEditar] = useState(null);
  const [crearVisible, setCrearVisible] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(null);

  const fetchInterrupciones = async () => {
    setCargando(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/interrupciones/por-etapa/${etapa.idEtapa}`
      );
      setInterrupciones(res.data);
    } catch (err) {
      console.error("Error al cargar interrupciones:", err);
      setInterrupciones([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (etapa && etapa.idEtapa) {
      fetchInterrupciones();
    }
  }, [etapa]);


  if (crearVisible) {
    return (
      <CrearInterrupcion
        etapa={etapa}
        usuario={usuario}
        onBack={() => setCrearVisible(false)}
        onCreado={() => {
          setCrearVisible(false);
          fetchInterrupciones();
        }}
      />
    );
  }


  if (interrupcionEditar) {
    return (
      <ModificarInterrupcion
        interrupcion={interrupcionEditar} // ⚠ corregido aquí
        onBack={() => setInterrupcionEditar(null)}
        onActualizado={() => {
          setInterrupcionEditar(null);
          fetchInterrupciones();
        }}
      />
    );
  }

  
  if (modalEliminar) {
    return (
      <EliminarInterrupcion
        interrupcion={modalEliminar}
        onBack={() => setModalEliminar(null)}
        onEliminado={() => {
          setModalEliminar(null);
          fetchInterrupciones();
        }}
      />
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">
        Interrupciones de {etapa.nombreEtapa}
      </h3>
      <button
        onClick={() => setCrearVisible(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Crear Interrupción
      </button>

      {cargando ? (
        <p>Cargando interrupciones...</p>
      ) : interrupciones.length > 0 ? (
        <ul className="space-y-2">
          {interrupciones.map((i) => (
            <li
              key={i.idInterrupcion}
              className="border p-2 rounded bg-gray-50 flex justify-between items-center"
            >
              <div>
                <strong>{i.tipoInterrupcion}</strong>: {i.descripcion} —{" "}
                {i.fecha} ({i.duracion} min)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setInterrupcionEditar(i)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Modificar
                </button>
                <button
                  onClick={() => setModalEliminar(i)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay interrupciones registradas en esta etapa.</p>
      )}
    </div>
  );
}

export default GestionInterrupciones;
