import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import correcto para evitar error autoTable

function ReportesLiderPanel() {
  const [idProyecto, setIdProyecto] = useState("");
  const [idLider, setIdLider] = useState("");
  const [reporteActividades, setReporteActividades] = useState([]);
  const [reporteInterrupciones, setReporteInterrupciones] = useState([]);
  const [reporteResumen, setReporteResumen] = useState([]);
  const [tipoReporte, setTipoReporte] = useState("");

  const API_URL = "http://localhost:8080/api/reportes";

  // 🔹 Obtener actividades por proyecto
  const obtenerActividadesProyecto = async () => {
    if (!idProyecto) {
      alert("Debes ingresar el ID del proyecto");
      return;
    }
    try {
      const resp = await axios.get(`${API_URL}/proyecto/${idProyecto}/actividades`);
      setReporteActividades(resp.data);
      setReporteInterrupciones([]);
      setReporteResumen([]);
      setTipoReporte("actividades");
    } catch (error) {
      console.error(error);
      alert("Error al obtener actividades del proyecto");
    }
  };

  // 🔹 Obtener interrupciones por proyecto
  const obtenerInterrupcionesProyecto = async () => {
    if (!idProyecto) {
      alert("Debes ingresar el ID del proyecto");
      return;
    }
    try {
      const resp = await axios.get(`${API_URL}/proyecto/${idProyecto}/interrupciones`);
      setReporteInterrupciones([{ idProyecto, duracion: resp.data }]);
      setReporteActividades([]);
      setReporteResumen([]);
      setTipoReporte("interrupciones");
    } catch (error) {
      console.error(error);
      alert("Error al obtener interrupciones del proyecto");
    }
  };

  // 🔹 Obtener resumen de proyectos del líder
  const obtenerResumenProyectos = async () => {
    if (!idLider) {
      alert("Debes ingresar el ID del líder");
      return;
    }
    try {
      const resp = await axios.get(`${API_URL}/general/${idLider}`);
      setReporteResumen(resp.data);
      setReporteActividades([]);
      setReporteInterrupciones([]);
      setTipoReporte("resumen");
    } catch (error) {
      console.error(error);
      alert("Error al obtener resumen de proyectos");
    }
  };

  // 🔹 Exportar Excel
  const exportarExcel = () => {
    let datos = [];
    let nombreArchivo = "";

    if (tipoReporte === "actividades") {
      datos = reporteActividades.map((a) => ({
        "ID Actividad": a.idActividad,
        "Nombre Actividad": a.nombreActividad,
        "Descripción": a.descripcion,
        "Nombre Proyecto": a.nombreProyecto,
        "Desarrollador": a.nombreDesarrollador,
      }));
      nombreArchivo = "reporte_actividades.xlsx";
    } else if (tipoReporte === "interrupciones") {
      datos = reporteInterrupciones.map((i) => ({
        "ID Proyecto": i.idProyecto,
        "Duración Total Interrupciones": i.duracion,
      }));
      nombreArchivo = "reporte_interrupciones.xlsx";
    } else if (tipoReporte === "resumen") {
      datos = reporteResumen.map((r) => ({
        "ID Proyecto": r.idProyecto,
        "Nombre Proyecto": r.nombreProyecto,
        "Estado": r.estado,
        "Avance": r.avance,
      }));
      nombreArchivo = "resumen_proyectos.xlsx";
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
      doc.text("Reporte de Actividades por Proyecto", 14, 15);
      autoTable(doc, {
        startY: 25,
        head: [["ID Actividad", "Nombre Actividad", "Descripción", "Nombre Proyecto", "Desarrollador"]],
        body: reporteActividades.map((a) => [
          a.idActividad,
          a.nombreActividad,
          a.descripcion,
          a.nombreProyecto,
          a.nombreDesarrollador,
        ]),
      });
      doc.save("reporte_actividades.pdf");
    } else if (tipoReporte === "interrupciones") {
      doc.text("Reporte de Interrupciones por Proyecto", 14, 15);
      autoTable(doc, {
        startY: 25,
        head: [["ID Proyecto", "Duración Total Interrupciones"]],
        body: reporteInterrupciones.map((i) => [i.idProyecto, i.duracion]),
      });
      doc.save("reporte_interrupciones.pdf");
    } else if (tipoReporte === "resumen") {
      doc.text("Resumen de Proyectos", 14, 15);
      autoTable(doc, {
        startY: 25,
        head: [["ID Proyecto", "Nombre Proyecto", "Estado", "Avance"]],
        body: reporteResumen.map((r) => [r.idProyecto, r.nombreProyecto, r.estado, r.avance]),
      });
      doc.save("resumen_proyectos.pdf");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Reportes del Líder
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="number"
          placeholder="ID Proyecto"
          value={idProyecto}
          onChange={(e) => setIdProyecto(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2"
        />
        <input
          type="number"
          placeholder="ID Líder (para resumen)"
          value={idLider}
          onChange={(e) => setIdLider(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <button
          onClick={obtenerActividadesProyecto}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Ver Actividades
        </button>
        <button
          onClick={obtenerInterrupcionesProyecto}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Ver Interrupciones
        </button>
        <button
          onClick={obtenerResumenProyectos}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ver Resumen Proyectos
        </button>
      </div>

      {tipoReporte === "actividades" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">ID Actividad</th>
                <th className="py-2 px-4">Nombre Actividad</th>
                <th className="py-2 px-4">Descripción</th>
                <th className="py-2 px-4">Nombre Proyecto</th>
                <th className="py-2 px-4">Desarrollador</th>
              </tr>
            </thead>
            <tbody>
              {reporteActividades.map((a, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-4">{a.idActividad}</td>
                  <td className="py-2 px-4">{a.nombreActividad}</td>
                  <td className="py-2 px-4">{a.descripcion}</td>
                  <td className="py-2 px-4">{a.nombreProyecto}</td>
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
                <th className="py-2 px-4">Duración Total Interrupciones</th>
              </tr>
            </thead>
            <tbody>
              {reporteInterrupciones.map((i, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4">{i.idProyecto}</td>
                  <td className="py-2 px-4">{i.duracion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tipoReporte === "resumen" && (
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
              {reporteResumen.map((r, idx) => (
                <tr key={idx} className="border-t">
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
    </div>
  );
}

export default ReportesLiderPanel;
