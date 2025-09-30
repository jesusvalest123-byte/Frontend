import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-cyan-500 text-white text-center p-6">
      <p>© 2025 Ikernell. Todos los derechos reservados.</p>
      <p>
        Contacto: contacto@ikernell.com | Tel: +57 300 123 4567 |{" "}
        <Link to="/pregunta" className="underline hover:text-gray-800">
          Enviar una pregunta
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
