import React from "react";

function Footer({ onPreguntaClick }) {
  return (
    <footer className="bg-cyan-500 text-white text-center p-6">
      <p>© 2025 Ikernell. Todos los derechos reservados.</p>
      <p>
        Contacto: contacto@ikernell.com | Tel: +57 300 123 4567 |{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPreguntaClick();
          }}
          className="underline hover:text-gray-800 cursor-pointer"
        >
          Enviar una pregunta
        </a>
      </p>
    </footer>
  );
}

export default Footer;
