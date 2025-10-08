import React, { useState } from "react";

function TrabajadoresInfo() {
  const [vista, setVista] = useState("principal");
  const [contenido, setContenido] = useState(null);

  const programas = [
    {
      id: "gestion",
      titulo: "Gestión de Proyectos",
      imagen: "/images/gestion_proyectos.png",
      descripcion:
        "Administra proyectos de software con herramientas integradas para planificación, tareas y rendimiento.",
      contenido: (
        <>
          <h2 className="text-3xl font-bold text-cyan-600 mb-3">
            Biblioteca: Gestión de Proyectos
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            El sistema de gestión de proyectos de la empresa está diseñado para
            optimizar la planificación, ejecución y supervisión de iniciativas de
            desarrollo de software. Permite a los líderes asignar tareas, establecer
            prioridades, estimar tiempos y supervisar el avance de cada módulo
            en tiempo real.
          </p>
          <p className="text-gray-700 mb-4">
            Cada proyecto cuenta con herramientas de seguimiento integradas, 
            un panel de indicadores de desempeño (KPI), y control de versiones.
            Además, el sistema ofrece comunicación directa con los equipos mediante
            chat y correo corporativo, asegurando que todos los miembros estén
            alineados con los objetivos.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Gestión de cronogramas, hitos y dependencias.</li>
            <li>Control de costos, tiempos y recursos humanos.</li>
            <li>Panel de reportes automáticos y exportación a PDF/Excel.</li>
            <li>Integración con Jira, Trello y GitHub.</li>
            <li>Alertas de riesgo y desviaciones de planificación.</li>
          </ul>
        </>
      ),
    },
    {
      id: "errores",
      titulo: "Control de Errores del Sistema",
      imagen: "/images/control_errores.jpg",
      descripcion:
        "Sistema centralizado para registrar, clasificar y resolver errores técnicos del software.",
      contenido: (
        <>
          <h2 className="text-3xl font-bold text-cyan-600 mb-3">
            Biblioteca: Control de Errores del Sistema
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Esta herramienta permite gestionar la calidad del código y mejorar
            la estabilidad del software. Cada error o interrupción es registrado
            con detalles técnicos, prioridad, responsable y estado del seguimiento.
          </p>
          <p className="text-gray-700 mb-4">
            Los desarrolladores pueden visualizar los errores filtrados por módulo,
            versión o usuario, y generar reportes estadísticos para identificar las
            causas más frecuentes. También cuenta con integración a GitHub Issues
            y Slack para notificaciones en tiempo real.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Registro automático de errores con logs y trazas.</li>
            <li>Clasificación por tipo, severidad y frecuencia.</li>
            <li>Asignación de responsables y seguimiento de soluciones.</li>
            <li>Reportes comparativos de estabilidad por versión.</li>
          </ul>
        </>
      ),
    },
    {
      id: "buenaspracticas",
      titulo: "Guía de Buenas Prácticas",
      imagen: "/images/buenas_practicas.jpg",
      descripcion:
        "Manual corporativo sobre estándares de codificación, arquitectura y seguridad.",
      contenido: (
        <>
          <h2 className="text-3xl font-bold text-cyan-600 mb-3">
            Biblioteca: Guía de Buenas Prácticas
          </h2>
          <p className="text-gray-700 mb-4">
            Esta guía fue elaborada por el equipo de arquitectura de software y 
            define los estándares de programación de la empresa. Incluye políticas
            de seguridad, estructura de carpetas, patrones de diseño y prácticas
            para mantener la eficiencia y legibilidad del código.
          </p>
          <p className="text-gray-700 mb-4">
            El objetivo principal es garantizar la mantenibilidad de los proyectos
            a largo plazo, reducir errores comunes y fomentar un estilo de desarrollo
            coherente entre los equipos.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Normas de nomenclatura y documentación técnica.</li>
            <li>Principios SOLID, DRY y Clean Code.</li>
            <li>Revisión de código entre pares y pruebas unitarias.</li>
            <li>Uso responsable de dependencias externas.</li>
            <li>Configuración segura de servidores y bases de datos.</li>
          </ul>
        </>
      ),
    },
  ];

  const tutoriales = [
    {
      id: "java",
      titulo: "Fundamentos de Java",
      imagen: "/images/java_fundamentos.jpg",
      descripcion:
        "Aprende el lenguaje Java desde cero: sintaxis, clases, objetos, herencia y manejo de excepciones.",
      contenido: (
        <>
          <h2 className="text-3xl font-bold text-cyan-600 mb-3">
            Tutorial: Fundamentos de Java
          </h2>
          <p className="text-gray-700 mb-4">
            Java es un lenguaje orientado a objetos ampliamente utilizado en 
            aplicaciones empresariales y móviles. En este tutorial aprenderás
            sus fundamentos, cómo estructurar programas, compilar código y aplicar
            los principios de POO.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
            <li>Instalación del JDK y configuración de entorno (IntelliJ, VSCode o Eclipse).</li>
            <li>Tipos de datos, operadores, control de flujo y estructuras de decisión.</li>
            <li>Clases, objetos, herencia, interfaces y encapsulamiento.</li>
            <li>Excepciones, try-catch-finally y manejo de errores.</li>
            <li>Uso de colecciones (List, Map, Set) y Streams.</li>
          </ul>
          <p className="text-gray-700 mb-3">
            Al finalizar este módulo serás capaz de crear tus propios programas
            en Java y comprender cómo funcionan las bases de frameworks como Spring Boot.
          </p>
        </>
      ),
    },
    {
      id: "react",
      titulo: "Introducción a React",
      imagen: "/images/react_intro.jpg",
      descripcion:
        "Crea interfaces modernas con React, usa Hooks y organiza proyectos escalables.",
      contenido: (
        <>
          <h2 className="text-3xl font-bold text-cyan-600 mb-3">
            Tutorial: Introducción a React
          </h2>
          <p className="text-gray-700 mb-4">
            React es una librería desarrollada por Meta para construir interfaces
            de usuario dinámicas. En este tutorial aprenderás a crear componentes,
            manejar estados y trabajar con el ciclo de vida de las aplicaciones SPA.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
            <li>Creación de proyectos con Create React App o Vite.</li>
            <li>Componentes funcionales, props y composición.</li>
            <li>Hooks: useState, useEffect y useContext.</li>
            <li>Renderizado condicional, listas dinámicas y eventos.</li>
            <li>Comunicación con APIs REST usando Axios.</li>
          </ul>
          <p className="text-gray-700 mb-3">
            Este curso sienta las bases para el desarrollo moderno con React,
            incluyendo buenas prácticas y estructura profesional de carpetas.
          </p>
        </>
      ),
    },
    {
      id: "node",
      titulo: "Node.js Básico",
      imagen: "/images/node_basico.jpg",
      descripcion:
        "Aprende a crear servidores y APIs REST usando Node.js y Express.",
      contenido: (
        <>
          <h2 className="text-3xl font-bold text-cyan-600 mb-3">
            Tutorial: Node.js Básico
          </h2>
          <p className="text-gray-700 mb-4">
            Node.js permite ejecutar JavaScript del lado del servidor. Es una
            herramienta esencial para construir aplicaciones backend modernas y
            escalables. Este módulo explica cómo crear un servidor y manejar peticiones.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
            <li>Instalación y uso del gestor de paquetes npm.</li>
            <li>Creación de un servidor básico con Express.</li>
            <li>Definición de rutas GET, POST, PUT y DELETE.</li>
            <li>Conexión con bases de datos (MongoDB o PostgreSQL).</li>
            <li>Manejo de errores y middleware personalizados.</li>
          </ul>
          <p className="text-gray-700 mb-3">
            Al finalizar, podrás construir una API REST funcional y conectarla con un
            frontend en React para crear aplicaciones full stack.
          </p>
        </>
      ),
    },
  ];

  if (vista !== "principal" && contenido) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
        {contenido}
        <button
          onClick={() => {
            setVista("principal");
            setContenido(null);
          }}
          className="mt-6 bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <h1 className="text-3xl font-extrabold text-cyan-600 mb-6 text-center">
        Trabajadores y Servicios Adicionales
      </h1>

      <p className="text-gray-700 mb-6 text-center">
        Los trabajadores tienen acceso a herramientas internas, biblioteca técnica y tutoriales especializados
        para su desarrollo profesional y técnico dentro de la empresa.
      </p>

      <h2 className="text-2xl font-bold text-cyan-600 mb-4">Biblioteca de Programas</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {programas.map((p) => (
          <div key={p.id} className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-lg transition">
            <img src={p.imagen} alt={p.titulo} className="rounded-lg mb-3 w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold text-cyan-700">{p.titulo}</h3>
            <p className="text-gray-600 text-sm mb-3">{p.descripcion}</p>
            <button
              onClick={() => {
                setVista(p.id);
                setContenido(p.contenido);
              }}
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
            >
              Abrir
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-cyan-600 mb-4">Tutoriales de Programación</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tutoriales.map((t) => (
          <div key={t.id} className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-lg transition">
            <img src={t.imagen} alt={t.titulo} className="rounded-lg mb-3 w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold text-cyan-700">{t.titulo}</h3>
            <p className="text-gray-600 text-sm mb-3">{t.descripcion}</p>
            <button
              onClick={() => {
                setVista(t.id);
                setContenido(t.contenido);
              }}
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
            >
              Ver Tutorial
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrabajadoresInfo;
