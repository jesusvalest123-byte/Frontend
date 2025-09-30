import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-cyan-500 mb-12 text-center">
        Bienvenido a Ikernell
      </h1>
      <p className="text-gray-700 text-lg max-w-2xl text-center mb-12">
        Explora nuestras soluciones y conoce más sobre nuestra empresa. 
        Aquí encontrarás información sobre nuestra misión, visión y los servicios que ofrecemos.
      </p>

      {/* Cuadros de Nosotros y Servicios */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cuadro de Nosotros */}
        <div className="bg-white shadow-lg rounded-xl p-8 w-72 flex flex-col items-center">
          <img 
            src="/assets/nosotros.png" 
            alt="Nosotros" 
            className="w-32 h-32 object-cover rounded-lg mb-4"
          />
          <h3 className="text-2xl font-semibold text-cyan-500 mb-2">Nosotros</h3>
          <p className="text-gray-600 text-center mb-4">
            Conoce quiénes somos, nuestra misión y visión.
          </p>
          <Link to="/nosotros">
            <button className="bg-cyan-500 text-white font-bold px-4 py-2 rounded hover:bg-cyan-600">
              Ver más
            </button>
          </Link>
        </div>

        {/* Cuadro de Servicios */}
        <div className="bg-white shadow-lg rounded-xl p-8 w-72 flex flex-col items-center">
          <img 
            src="/assets/servicios.png" 
            alt="Servicios" 
            className="w-32 h-32 object-cover rounded-lg mb-4"
          />
          <h3 className="text-2xl font-semibold text-cyan-500 mb-2">Servicios</h3>
          <p className="text-gray-600 text-center mb-4">
            Descubre los servicios que ofrecemos a nuestros clientes.
          </p>
          <Link to="/servicios">
            <button className="bg-cyan-500 text-white font-bold px-4 py-2 rounded hover:bg-cyan-600">
              Ver más
            </button>
          </Link>
        </div>
      </div>

      {/* Testimonios */}
      <div className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <img src="/assets/testimonio1.png" alt="Cliente 1" className="w-24 h-24 object-cover rounded-lg mb-4"/>
          <h4 className="font-bold text-cyan-500 mb-2">Excelente Servicio</h4>
          <p className="text-gray-600 text-sm">
            Gracias al equipo de Ikernell, hemos mejorado significativamente nuestra eficiencia operativa. Su atención al cliente es excepcional.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <img src="/assets/testimonio2.png" alt="Cliente 2" className="w-24 h-24 object-cover rounded-lg mb-4"/>
          <h4 className="font-bold text-cyan-500 mb-2">Soluciones Efectivas</h4>
          <p className="text-gray-600 text-sm">
            Las soluciones personalizadas que nos proporcionaron han sido clave para nuestro crecimiento. Recomendamos Ikernell a otras empresas.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <img src="/assets/testimonio3.png" alt="Cliente 3" className="w-24 h-24 object-cover rounded-lg mb-4"/>
          <h4 className="font-bold text-cyan-500 mb-2">Asesoría Invaluable</h4>
          <p className="text-gray-600 text-sm">
            La consultoría ofrecida por Ikernell nos ha permitido tomar mejores decisiones tecnológicas. Su equipo es muy profesional y competente.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
