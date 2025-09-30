import React from "react";

function Dashboard({ rol }) {
  const cards = [];

  if (rol === "coordinador") {
    cards.push(
      { title: "Proyectos", description: "CRUD de proyectos y ver etapas/actividades", action: "/proyectos" },
      { title: "Consultar Personal", description: "Ver información de los trabajadores", action: "/personal" },
      { title: "Preguntas", description: "Visualizar preguntas de usuarios", action: "/preguntas" },
      { title: "Reportes", description: "Generar reportes de proyectos y actividades", action: "/reportes" }
    );
  } else if (rol === "lider") {
    cards.push(
      { title: "Etapas", description: "CRUD de etapas dentro de proyectos asignados", action: "/etapas" },
      { title: "Actividades", description: "CRUD de actividades dentro de cada etapa", action: "/actividades" }
    );
  } else if (rol === "desarrollador") {
    cards.push(
      { title: "Mis Actividades", description: "Cambiar estado de mis actividades", action: "/mis-actividades" },
      { title: "Reportar Errores", description: "Reportar interrupciones o errores", action: "/errores" }
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p className="text-gray-600 text-center">{card.description}</p>
          <button
            onClick={() => window.location.href = card.action}
            className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
          >
            Ir
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
