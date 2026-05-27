import * as XLSX from "xlsx-js-style";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
export function exportToExcel(transactions) {
  const data = [
    ["Name", "Amount", "Type", "Note", "Date"], // header row
    ...transactions.map((tx) => [
      tx.name,
      tx.amount,
      tx.type,
      tx.note,
      tx.date,
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Set column widths (makes it look like a table)
  worksheet["!cols"] = [
    { wch: 20 },
    { wch: 10 },
    { wch: 12 },
    { wch: 30 },
    { wch: 15 },
  ];

  // Style header row (basic support)
  const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let C = headerRange.s.c; C <= headerRange.e.c; C++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });

    if (!worksheet[cellAddress]) continue;

    worksheet[cellAddress].s = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "1F4E79" } }, // dark blue
      alignment: { horizontal: "center" },
    };
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

  XLSX.writeFile(workbook, "vault-transactions.xlsx");
}

export function exportToPDF(transactions) {
  const doc = new jsPDF();

  const tableColumn = ["Name", "Amount", "Type", "Note", "Date"];

  const tableRows = transactions.map((tx) => [
    tx.name,
    tx.amount,
    tx.type,
    tx.note,
    tx.date,
  ]);

  doc.setFontSize(16);
  doc.text("Vault Transactions", 14, 15);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 25,

    styles: {
      fontSize: 10,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [31, 78, 121], // dark blue
      textColor: 255,
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  doc.save("vault-transactions.pdf");
}
