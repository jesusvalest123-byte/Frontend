import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

function ReportesCoorPanel() {
  const [idUsuario, setIdUsuario] = useState("");
  const [reporteDesempeno, setReporteDesempeno] = useState([]);
  const [reporteActividades, setReporteActividades] = useState([]);
  const [tipoReporte, setTipoReporte] = useState("");

  const API_URL = "http://localhost:8080/api/reportes";
  const API_USUARIOS = "http://localhost:8080/api/usuarios";


  const obtenerNombreDesarrollador = async (id) => {
    if (!id) return "Todos los desarrolladores";
    try {
      const resp = await axios.get(`${API_USUARIOS}/${id}`);
      return resp.data.nombre;
    } catch {
      return "Desarrollador no encontrado";
    }
  };

  
  const obtenerDesempeno = async () => {
    setTipoReporte("desempeno");
    if (!idUsuario) {
      
      try {
        const resp = await axios.get(`${API_URL}/desempeno`);
        setReporteDesempeno(resp.data);
        setReporteActividades([]);
      } catch (error) {
        console.error(error);
        alert("Error al obtener desempeño de todos los desarrolladores.");
      }
    } else {
    
      const nombre = await obtenerNombreDesarrollador(idUsuario);
      try {
        const resp = await axios.get(`${API_URL}/desempeno/${idUsuario}`);
        setReporteDesempeno([{ id: idUsuario, nombre, porcentaje: resp.data }]);
        setReporteActividades([]);
      } catch {
        alert("Error al obtener desempeño del desarrollador.");
      }
    }
  };

  
  const obtenerActividades = async () => {
    setTipoReporte("actividades");
    if (!idUsuario) {
   
      try {
        const resp = await axios.get(`${API_URL}/actividades`);
        setReporteActividades(resp.data);
        setReporteDesempeno([]);
      } catch (error) {
        console.error(error);
        alert("Error al obtener actividades de todos los desarrolladores.");
      }
    } else {
      
      try {
        const resp = await axios.get(`${API_URL}/actividades/usuario/${idUsuario}`);
        setReporteActividades(resp.data);
        setReporteDesempeno([]);
      } catch (error) {
        console.error(error);
        alert("Error al obtener actividades del desarrollador.");
      }
    }
  };


  const exportarExcel = () => {
    let datos = [];
    let nombreArchivo = "";

    if (tipoReporte === "desempeno") {
      datos = reporteDesempeno.map((d) => ({
        ID: d.id,
        Desarrollador: d.nombre,
        "Porcentaje de Desempeño": `${d.porcentaje}%`,
      }));
      nombreArchivo = "reporte_desempeno.xlsx";
    } else if (tipoReporte === "actividades") {
      datos = reporteActividades.map((a) => ({
        "ID Proyecto": a.idProyecto,
        "Nombre Proyecto": a.nombreProyecto,
        "ID Actividad": a.idActividad,
        "Nombre Actividad": a.nombreActividad,
        Descripción: a.descripcion,
        Desarrollador: a.nombreDesarrollador,
      }));
      nombreArchivo = "reporte_actividades.xlsx";
    }

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Reporte");
    XLSX.writeFile(libro, nombreArchivo);
  };

 
  const exportarPDF = () => {
    const doc = new jsPDF();
    if (tipoReporte === "desempeno") {
      doc.text("Reporte de Desempeño", 14, 15);
      autoTable(doc, {
        startY: 25,
        head: [["ID", "Desarrollador", "Porcentaje de Desempeño"]],
        body: reporteDesempeno.map((d) => [d.id, d.nombre, `${d.porcentaje}%`]),
      });
      doc.save("reporte_desempeno.pdf");
    } else if (tipoReporte === "actividades") {
      doc.text("Reporte de Actividades", 14, 15);
      autoTable(doc, {
        startY: 25,
        head: [["ID Proyecto", "Nombre Proyecto", "ID Actividad", "Nombre Actividad", "Descripción", "Desarrollador"]],
        body: reporteActividades.map((a) => [
          a.idProyecto,
          a.nombreProyecto,
          a.idActividad,
          a.nombreActividad,
          a.descripcion,
          a.nombreDesarrollador,
        ]),
      });
      doc.save("reporte_actividades.pdf");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Reportes del Coordinador
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="number"
          placeholder="ID del Desarrollador (opcional)"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2"
        />
        <button
          onClick={obtenerDesempeno}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ver Desempeño
        </button>
        <button
          onClick={obtenerActividades}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Ver Actividades
        </button>
      </div>

      {tipoReporte === "desempeno" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Desarrollador</th>
                <th className="py-2 px-4">Porcentaje de Desempeño</th>
              </tr>
            </thead>
            <tbody>
              {reporteDesempeno.map((d, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-4">{d.id}</td>
                  <td className="py-2 px-4">{d.nombre}</td>
                  <td className="py-2 px-4">{d.porcentaje}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tipoReporte === "actividades" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">ID Proyecto</th>
                <th className="py-2 px-4">Nombre Proyecto</th>
                <th className="py-2 px-4">ID Actividad</th>
                <th className="py-2 px-4">Nombre Actividad</th>
                <th className="py-2 px-4">Descripción</th>
                <th className="py-2 px-4">Desarrollador</th>
              </tr>
            </thead>
            <tbody>
              {reporteActividades.map((a, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-4">{a.idProyecto}</td>
                  <td className="py-2 px-4">{a.nombreProyecto}</td>
                  <td className="py-2 px-4">{a.idActividad}</td>
                  <td className="py-2 px-4">{a.nombreActividad}</td>
                  <td className="py-2 px-4">{a.descripcion}</td>
                  <td className="py-2 px-4">{a.nombreDesarrollador}</td>
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

export default ReportesCoorPanel;

	
