import React, { useState, useEffect } from "react";

function ConsultarUsuarios({ onBack, onModificar, onEliminar }) {
  const [usuarios, setUsuarios] = useState([]);
  const [busquedaId, setBusquedaId] = useState("");
  const [resultado, setResultado] = useState(null);

  // Cargar todos los usuarios al montar el componente
  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error cargando usuarios:", err));
  }, []);

  const handleBuscar = () => {
    if (busquedaId.trim() === "") {
      setResultado(null);
      return;
    }

    fetch(`http://localhost:8080/api/usuarios/${busquedaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Usuario no encontrado");
        return res.json();
      })
      .then((data) => setResultado(data))
      .catch(() => {
        alert("❌ Usuario no encontrado");
        setResultado(null);
      });
  };

  // Función para obtener la URL completa de la foto
  const obtenerUrlFoto = (fotoLink) => {
    return fotoLink ? `http://localhost:8080${fotoLink}` : "https://via.placeholder.com/150";
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Consultar Usuarios
      </h2>

      {/* Formulario de búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="number"
          placeholder="Ingrese ID del usuario"
          value={busquedaId}
          onChange={(e) => setBusquedaId(e.target.value)}
          className="border p-3 rounded flex-1 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {/* Mostrar un usuario por ID */}
      {resultado ? (
        <div className="overflow-x-auto">
          <div className="flex justify-center mb-4">
            <img
              src={obtenerUrlFoto(resultado.foto)}
              alt="Foto del usuario"
              className="w-32 h-32 rounded-full object-cover border shadow"
            />
          </div>

          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Campo</th>
                <th className="p-3 border">Valor</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(resultado)
                .filter(([key]) => key !== "contrasena" && key !== "foto")
                .map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="p-3 border font-bold capitalize">{key}</td>
                    <td className="p-3 border">{value}</td>
                  </tr>
                ))}
              <tr>
                <td className="p-3 border font-bold">Foto</td>
                <td className="p-3 border">
                  <img
                    src={obtenerUrlFoto(resultado.foto)}
                    alt="Foto del usuario"
                    className="w-24 h-24 rounded object-cover border shadow"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => onModificar(resultado)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              ✏️ Modificar
            </button>
            <button
              onClick={() => onEliminar(resultado)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Mostrar todos los usuarios */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Nombre</th>
                  <th className="p-3 border">Apellido</th>
                  <th className="p-3 border">Correo</th>
                  <th className="p-3 border">Rol</th>
                  <th className="p-3 border">Foto</th>
                  <th className="p-3 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.idusuario} className="hover:bg-gray-50">
                    <td className="p-3 border">{u.idusuario}</td>
                    <td className="p-3 border">{u.nombre}</td>
                    <td className="p-3 border">{u.apellido}</td>
                    <td className="p-3 border">{u.correo}</td>
                    <td className="p-3 border">{u.idRol}</td>
                    <td className="p-3 border">
                      <img
                        src={obtenerUrlFoto(u.foto)}
                        alt="Foto"
                        className="w-16 h-16 rounded object-cover border shadow"
                      />
                    </td>
                    <td className="p-3 border flex gap-2">
                      <button
                        onClick={() => onModificar(u)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onEliminar(u)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <button
        onClick={onBack}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        ⬅ Volver
      </button>
    </div>
  );
}

export default ConsultarUsuarios;
