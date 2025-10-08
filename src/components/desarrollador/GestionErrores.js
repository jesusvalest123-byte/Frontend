import React, { useState, useEffect } from "react";
import axios from "axios";
import CrearError from "./CrearError";
import ModificarError from "./ModificarError";
import EliminarError from "./EliminarError";

function GestionErrores({ etapa, usuario }) {
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorEditar, setErrorEditar] = useState(null);
  const [crearVisible, setCrearVisible] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(null);

  const fetchErrores = async () => {
    setCargando(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/errores/por-usuario/${usuario.idusuario}`
      );
      // Filtramos solo los errores de la etapa seleccionada
      setErrores(res.data.filter((e) => e.idEtapa === etapa.idEtapa));
    } catch (err) {
      console.error(err);
      setErrores([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchErrores();
  }, [etapa]);

  // Si estamos creando un error, mostramos solo el formulario
  if (crearVisible) {
    return (
      <CrearError
        etapa={etapa}
        usuario={usuario}
        onBack={() => setCrearVisible(false)}
        onCreado={() => {
          setCrearVisible(false);
          fetchErrores();
        }}
      />
    );
  }

  // Si estamos modificando un error, mostramos solo el formulario
  if (errorEditar) {
    return (
      <ModificarError
        errorEditar={errorEditar}
        onBack={() => setErrorEditar(null)}
        onActualizado={() => {
          setErrorEditar(null);
          fetchErrores();
        }}
      />
    );
  }

  // Si estamos eliminando un error, mostramos solo el modal
  if (modalEliminar) {
    return (
      <EliminarError
        error={modalEliminar}
        onBack={() => setModalEliminar(null)}
        onEliminado={() => {
          setModalEliminar(null);
          fetchErrores();
        }}
      />
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Errores de {etapa.nombreEtapa}</h3>
      <button
        onClick={() => setCrearVisible(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Crear Error
      </button>

      {cargando ? (
        <p>Cargando errores...</p>
      ) : errores.length > 0 ? (
        <ul className="space-y-2">
          {errores.map((e) => (
            <li
              key={e.idError}
              className="border p-2 rounded bg-gray-50 flex justify-between items-center"
            >
              <div>
                <strong>{e.tipoError}</strong>: {e.descripcion} ({e.fecha})
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setErrorEditar(e)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Modificar
                </button>
                <button
                  onClick={() => setModalEliminar(e)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay errores registrados en esta etapa.</p>
      )}
    </div>
  );
}

export default GestionErrores;
