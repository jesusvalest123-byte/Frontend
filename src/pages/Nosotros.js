import React from "react";

function Nosotros() {
  const secciones = [
    {
      title: "Quiénes somos",
      description:
        "IKernell Soluciones Software es una empresa dedicada a brindar servicios de software personalizados, adaptados a las necesidades de cada cliente. Nuestra filosofía se basa en la innovación constante y en un firme compromiso con la calidad.",
    },
    {
      title: "Misión",
      description:
        "Nuestra misión es desarrollar software que combine innovación, personalización y calidad, proporcionando soluciones que respondan a los retos específicos de cada cliente y aporten valor tangible a sus operaciones.",
    },
    {
      title: "Visión",
      description:
        "Nuestra visión es consolidarnos como una empresa líder en soluciones de software a nivel nacional e internacional, reconocida por nuestra capacidad de innovar continuamente y ofrecer servicios totalmente personalizados.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 sm:p-8 md:p-12 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-cyan-500 text-center mb-10 sm:mb-12">
        Nosotros
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
        {secciones.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition flex flex-col"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-500 mb-3 sm:mb-4 text-center sm:text-left">
              {sec.title}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-center sm:text-justify">
              {sec.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nosotros;

