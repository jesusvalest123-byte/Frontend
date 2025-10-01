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
    <div className="bg-gray-50 min-h-screen p-6 sm:p-8 md:p-12 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-cyan-500 text-center mb-10 sm:mb-12">
        Servicios
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
        {servicios.map((servicio, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition flex flex-col"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-500 mb-3 sm:mb-4 text-center sm:text-left">
              {servicio.title}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-center sm:text-justify">
              {servicio.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
