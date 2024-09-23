const convertToCSV = (objArray) => {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (const index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }
    str += line + "\r\n";
  }
  return str;
};

export const downloadCSV = (data, fileName) => {
  if (!data || data.length === 0) {
    console.error("No hay filas para exportar");
    return;
  }

  const rowData = data.map((row) => {
    const originalData = { ...row.original };
    originalData.tasa_efectiva_promedio = Number(originalData.tasa_efectiva_promedio).toFixed(2) + '%';
    return originalData;
  });
  
  if (rowData.length === 0) {
    console.error("No hay datos originales en las filas");
    return;
  }

  const header = [
    "Banco",
    "Tipo de crédito",
    "Producto de crédito",
    "Interés promedio",
  ];

  rowData.unshift(header);

  const csvContent = "\uFEFF" + convertToCSV(rowData); // Añadir BOM al inicio para UTF-8

  const csvData = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement("a");
  link.href = csvURL;
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadCSV;
