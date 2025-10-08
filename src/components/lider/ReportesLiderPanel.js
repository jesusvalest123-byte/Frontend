import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ReportesLiderPanel({ onBack }) {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState("");
  const [tipoReporte, setTipoReporte] = useState("");
  const [reporteActividades, setReporteActividades] = useState([]);
  const [reporteInterrupciones, setReporteInterrupciones] = useState([]);
  const [reporteGeneral, setReporteGeneral] = useState([]);

  const API_URL = "http://localhost:8080/api/reportes";
  const API_PROYECTOS = "http://localhost:8080/api/proyectos";

  // 🔹 Cargar proyectos
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const resp = await axios.get(`${API_PROYECTOS}`);
        setProyectos(resp.data);
      } catch (error) {
        console.error(error);
        alert("Error al cargar proyectos.");
      }
    };
    fetchProyectos();
  }, []);

  // 🔹 Actividades por proyecto
  const obtenerReporteActividades = async () => {
    if (!proyectoSeleccionado) {
      alert("Selecciona un proyecto");
      return;
    }
    setTipoReporte("actividades");
    try {
      const resp = await axios.get(`${API_URL}/proyecto/${proyectoSeleccionado}/actividades-lider`);
      setReporteActividades(resp.data);
      setReporteInterrupciones([]);
      setReporteGeneral([]);
    } catch (error) {
      console.error(error);
      alert("Error al obtener reporte de actividades.");
    }
  };

  // 🔹 Interrupciones por proyecto
  const obtenerReporteInterrupciones = async () => {
    if (!proyectoSeleccionado) {
      alert("Selecciona un proyecto");
      return;
    }
    setTipoReporte("interrupciones");
    try {
      const resp = await axios.get(`${API_URL}/proyecto/${proyectoSeleccionado}/interrupciones-lider`);
      setReporteInterrupciones(resp.data);
      setReporteActividades([]);
      setReporteGeneral([]);
    } catch (error) {
      console.error(error);
      alert("Error al obtener reporte de interrupciones.");
    }
  };

  // 🔹 Reporte general (todos los proyectos)
  const obtenerReporteGeneral = async () => {
    setTipoReporte("general");
    try {
      const resp = await axios.get(`${API_URL}/general`);
      setReporteGeneral(Array.isArray(resp.data) ? resp.data : []);
      setReporteActividades([]);
      setReporteInterrupciones([]);
    } catch (error) {
      console.error(error);
      alert("Error al obtener reporte general.");
    }
  };

  // 🔹 Exportar Excel
  const exportarExcel = () => {
    let datos = [];
    let nombreArchivo = "";

    if (tipoReporte === "actividades") {
      datos = reporteActividades.map((a) => ({
        "Nombre Actividad": a.nombreActividad,
        Descripción: a.descripcion,
        "Nombre Desarrollador": a.nombreDesarrollador,
      }));
      nombreArchivo = "reporte_actividades.xlsx";
    } else if (tipoReporte === "interrupciones") {
      datos = reporteInterrupciones.map((r) => ({
        "ID Proyecto": r.idProyecto,
        "Nombre Proyecto": r.nombreProyecto,
        "Duración Total de Interrupciones (minutos)": r.duracionTotalMinutos,
      }));
      nombreArchivo = "reporte_interrupciones.xlsx";
    } else if (tipoReporte === "general") {
      datos = reporteGeneral.map((r) => ({
        "ID Proyecto": r.idProyecto,
        "Nombre Proyecto": r.nombreProyecto,
        Estado: r.estado,
        Avance: r.avance,
      }));
      nombreArchivo = "reporte_general.xlsx";
    }

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Reporte");
    XLSX.writeFile(libro, nombreArchivo);
  };

  // 🔹 Exportar PDF
const exportarPDF = () => {
  const doc = new jsPDF();

  if (tipoReporte === "actividades") {
    doc.text("Reporte de Actividades", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [["Nombre Actividad", "Descripción", "Nombre Desarrollador"]],
      body: reporteActividades.map((a) => [a.nombreActividad, a.descripcion, a.nombreDesarrollador]),
    });
    doc.save("reporte_actividades.pdf");
  } else if (tipoReporte === "interrupciones") {
    doc.text("Reporte de Interrupciones", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [["ID Proyecto", "Nombre Proyecto", "Duración Total de Interrupciones (minutos)"]],
      body: reporteInterrupciones.map((r) => [r.idProyecto, r.nombreProyecto, r.duracionTotalMinutos]),
    });
    doc.save("reporte_interrupciones.pdf");
  } else if (tipoReporte === "general") {
    doc.text("Reporte General de Proyectos", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [["ID Proyecto", "Nombre Proyecto", "Estado", "Avance"]],
      body: reporteGeneral.map((r) => [r.idProyecto, r.nombreProyecto, r.estado, r.avance]),
    });
    doc.save("reporte_general.pdf");
  }
};

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Reportes del Líder
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <select
          value={proyectoSeleccionado}
          onChange={(e) => setProyectoSeleccionado(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2"
        >
          <option value="">Selecciona un proyecto</option>
          {proyectos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombreproyecto}
            </option>
          ))}
        </select>

        <button
          onClick={obtenerReporteActividades}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Actividades por Proyecto
        </button>

        <button
          onClick={obtenerReporteInterrupciones}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Interrupciones por Proyecto
        </button>

        <button
          onClick={obtenerReporteGeneral}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Reporte General
        </button>
      </div>

      {/* --- TABLAS --- */}
      {tipoReporte === "actividades" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Nombre Actividad</th>
                <th className="py-2 px-4">Descripción</th>
                <th className="py-2 px-4">Nombre Desarrollador</th>
              </tr>
            </thead>
            <tbody>
              {reporteActividades.map((a, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-4">{a.nombreActividad}</td>
                  <td className="py-2 px-4">{a.descripcion}</td>
                  <td className="py-2 px-4">{a.nombreDesarrollador}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tipoReporte === "interrupciones" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">ID Proyecto</th>
                <th className="py-2 px-4">Nombre Proyecto</th>
                <th className="py-2 px-4">Duración Total de Interrupciones (minutos)</th>
              </tr>
            </thead>
            <tbody>
              {reporteInterrupciones.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-4">{r.idProyecto}</td>
                  <td className="py-2 px-4">{r.nombreProyecto}</td>
                  <td className="py-2 px-4">{r.duracionTotalMinutos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tipoReporte === "general" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">ID Proyecto</th>
                <th className="py-2 px-4">Nombre Proyecto</th>
                <th className="py-2 px-4">Estado</th>
                <th className="py-2 px-4">Avance</th>
              </tr>
            </thead>
            <tbody>
              {reporteGeneral.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-4">{r.idProyecto}</td>
                  <td className="py-2 px-4">{r.nombreProyecto}</td>
                  <td className="py-2 px-4">{r.estado}</td>
                  <td className="py-2 px-4">{r.avance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tipoReporte && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={exportarPDF}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Descargar PDF
          </button>
          <button
            onClick={exportarExcel}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Descargar Excel
          </button>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={onBack}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default ReportesLiderPanel;
