import React from "react";

function Servicios() {
  const servicios = [
    {
      title: "Estrategia de Software a Medida",
      description:
        "Desarrollamos estrategias de software personalizadas alineadas con los objetivos de tu negocio, asegurando el máximo retorno y crecimiento sostenible.",
    },
    {
      title: "Transformación Digital",
      description:
        "Integramos nuevas tecnologías y cambios culturales para maximizar el valor de la tecnología y la competitividad de tu empresa.",
    },
    {
      title: "Análisis de Necesidades Tecnológicas",
      description:
        "Realizamos un análisis exhaustivo para ofrecer soluciones adecuadas, identificando áreas de mejora y oportunidades de innovación.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      <h1 className="text-4xl font-bold text-cyan-500 text-center mb-12">
        Servicios
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {servicios.map((servicio, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold text-cyan-500 mb-4">
              {servicio.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{servicio.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;

