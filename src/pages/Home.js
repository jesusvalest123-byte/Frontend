import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen p-6 sm:p-8 flex flex-col items-center">
     
      <h1 className="text-3xl sm:text-4xl font-bold text-cyan-500 mb-8 sm:mb-12 text-center">
        Bienvenido a Ikernell
      </h1>


      <p className="text-gray-700 text-base sm:text-lg max-w-2xl text-center mb-10 sm:mb-12 px-2">
        Explora nuestras soluciones y conoce más sobre nuestra empresa. 
        Aquí encontrarás información sobre nuestra misión, visión y los servicios que ofrecemos.
      </p>


      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full justify-center">
      
        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full sm:w-72 flex flex-col items-center">
          <img 
            src="/assets/nosotros.png" 
            alt="Nosotros" 
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl sm:text-2xl font-semibold text-cyan-500 mb-2">Nosotros</h3>
          <p className="text-gray-600 text-center mb-4 text-sm sm:text-base">
            Conoce quiénes somos, nuestra misión y visión.
          </p>
          <Link to="/nosotros" className="w-full sm:w-auto">
            <button className="bg-cyan-500 text-white font-bold px-4 py-2 rounded hover:bg-cyan-600 w-full sm:w-auto">
              Ver más
            </button>
          </Link>
        </div>

     
        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full sm:w-72 flex flex-col items-center">
          <img 
            src="/assets/servicios.png" 
            alt="Servicios" 
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl sm:text-2xl font-semibold text-cyan-500 mb-2">Servicios</h3>
          <p className="text-gray-600 text-center mb-4 text-sm sm:text-base">
            Descubre los servicios que ofrecemos a nuestros clientes.
          </p>
          <Link to="/servicios" className="w-full sm:w-auto">
            <button className="bg-cyan-500 text-white font-bold px-4 py-2 rounded hover:bg-cyan-600 w-full sm:w-auto">
              Ver más
            </button>
          </Link>
        </div>
      </div>


      <div className="mt-12 sm:mt-16 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-2">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <img src="/assets/testimonio1.png" alt="Cliente 1" className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mb-4"/>
          <h4 className="font-bold text-cyan-500 mb-2 text-lg">Excelente Servicio</h4>
          <p className="text-gray-600 text-sm sm:text-base">
            Gracias al equipo de Ikernell, hemos mejorado significativamente nuestra eficiencia operativa. Su atención al cliente es excepcional.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <img src="/assets/testimonio2.png" alt="Cliente 2" className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mb-4"/>
          <h4 className="font-bold text-cyan-500 mb-2 text-lg">Soluciones Efectivas</h4>
          <p className="text-gray-600 text-sm sm:text-base">
            Las soluciones personalizadas que nos proporcionaron han sido clave para nuestro crecimiento. Recomendamos Ikernell a otras empresas.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <img src="/assets/testimonio3.png" alt="Cliente 3" className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mb-4"/>
          <h4 className="font-bold text-cyan-500 mb-2 text-lg">Asesoría Invaluable</h4>
          <p className="text-gray-600 text-sm sm:text-base">
            La consultoría ofrecida por Ikernell nos ha permitido tomar mejores decisiones tecnológicas. Su equipo es muy profesional y competente.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
