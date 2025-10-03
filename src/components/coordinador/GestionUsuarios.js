import React, { useState } from "react";
import CrearUsuario from "./CrearUsuario";
import ConsultarUsuarios from "./ConsultarUsuarios";
import ModificarUsuario from "./ModificarUsuario";
import EliminarUsuario from "./EliminarUsuario";

function GestionUsuarios() {
  const [accion, setAccion] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const renderContenido = () => {
    switch (accion) {
      case "crear":
        return <CrearUsuario onBack={() => setAccion(null)} />;
      case "consultar":
        return (
          <ConsultarUsuarios
            onBack={() => setAccion(null)}
            onModificar={(usuario) => {
              setUsuarioSeleccionado(usuario);
              setAccion("modificar");
            }}
            onEliminar={(usuario) => {
              setUsuarioSeleccionado(usuario);
              setAccion("eliminar");
            }}
          />
        );
      case "modificar":
        return (
          <ModificarUsuario
            usuario={usuarioSeleccionado}
            onBack={() => setAccion("consultar")}
          />
        );
      case "eliminar":
        return (
          <EliminarUsuario
            usuario={usuarioSeleccionado}
            onBack={() => setAccion("consultar")}
          />
        );
      default:
        return (
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>
            <p className="text-gray-600 mb-6">
              Selecciona la acción que deseas realizar:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setAccion("crear")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                 Crear Usuario
              </button>
              <button
                onClick={() => setAccion("consultar")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                 Consultar Usuarios
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="p-4">{renderContenido()}</div>;
}

export default GestionUsuarios;
