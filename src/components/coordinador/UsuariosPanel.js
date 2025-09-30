import React, { useState, useEffect } from "react";

function UsuariosPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/usuarios");
      const data = await res.json();
      setUsuarios(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Correo</th>
              <th className="border px-4 py-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.idusuario}>
                <td className="border px-4 py-2">{u.idusuario}</td>
                <td className="border px-4 py-2">{u.nombre} {u.apellido}</td>
                <td className="border px-4 py-2">{u.correo}</td>
                <td className="border px-4 py-2">{u.idRol === 1 ? "Coordinador" : u.idRol === 2 ? "Líder" : "Desarrollador"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsuariosPanel;
