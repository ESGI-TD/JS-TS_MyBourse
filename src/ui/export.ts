import { Stock } from "../models/stock.js";

export function exportStocks(stocks: Stock[], chartType: string) {
  const headers = ["name", "date", "price", "volume"];
  const rows: (string | number)[][] = [];
  stocks.forEach((stock) => {
    stock.history.forEach((el) => {
      rows.push([stock.name, el.date, el.price, el.volume]);
    });
  });
  download(buildCSV(headers, rows), `${chartType}-export.csv`);
}

function buildCSV(headers: string[], rows: (string | number)[][]): string {
  const lines: string[] = [headers.join(",")];
  rows.forEach((r) => {
    lines.push(r.join(","));
  });
  return lines.join("\n");
}

function download(csv: string, filename: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
