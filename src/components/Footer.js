import React from "react";

function Footer() {
  return (
    <footer className="bg-teal-400 text-white text-center p-4 mt-auto">
      <p>© 2025 Ikernell. Todos los derechos reservados.</p>
      <p>
        Contacto: contacto@ikernell.com | Tel: +57 300 123 4567 |{" "}
        <a className="underline hover:text-[#2b3d53]" href="/formulario">Formulario de preguntas</a>
      </p>
    </footer>
  );
}

export default Footer;
