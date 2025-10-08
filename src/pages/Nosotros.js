import React from "react";

function Nosotros() {
  const secciones = [
    {
      title: "Quiénes Somos",
      description:
        "Somos una empresa de software dedicada a ofrecer soluciones innovadoras que generan valor para nuestros clientes. Estamos comprometidos con la excelencia, la creatividad y la transformación digital.",
    },
    {
      title: "Misión",
      description:
        "Nuestra misión es desarrollar soluciones de software a medida que optimicen procesos, mejoren la experiencia del usuario y contribuyan al crecimiento sostenible de las organizaciones.",
    },
    {
      title: "Visión",
      description:
        "Ser reconocidos como líderes en innovación tecnológica, ofreciendo productos y servicios que impulsen la transformación digital de empresas a nivel nacional e internacional.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 sm:p-8 md:p-12 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-cyan-500 text-center mb-10 sm:mb-12">
        Nosotros
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
        {secciones.map((seccion, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition flex flex-col"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-500 mb-3 sm:mb-4 text-center sm:text-left">
              {seccion.title}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-center sm:text-justify">
              {seccion.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nosotros;
