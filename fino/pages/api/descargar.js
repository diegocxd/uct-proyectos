import React from 'react';
import XLSX from 'xlsx';

const DescargarExel = ({ data, filename, buttonText }) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = data.map((finance) => [finance.id_transaccion,finance.gastos,finance.abonos,finance.presupuesto,finance.motivo, finance.fecha]);

    const worksheet = XLSX.utils.aoa_to_sheet([['id_transaccion','gastos','abonos','presupuesto','motivo','fecha'], ...sheetData]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabla de Finanzas');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(blobData);
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportToExcel}>{buttonText}</button>
  );
};

export default DescargarExel;
