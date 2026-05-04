import { displayStockLine, setLineChartData } from "./line";
import { NoData } from "../errors/apiError.js";
import { Stock } from "../models/stock.js";
import { displayStockBubble, setBubbleChartData } from "./bubble";
import { getData } from "../api/api";
import { removeChart, setStock } from "./stock";
import { setActiveChartButton } from "./design";
import { displayStockMixed } from "./mixed";

declare const Chart: any;
export let chart: any = null;
export const currentSelection = new Map<string, Stock[]>();
//Affichage du graphique dans le DOM
export async function displayStock(chartType: string) {
  const data = await getData();
  if (!data) {
    throw new NoData("Erreur data: ");
  }
  removeChart();
  await getCurrentChart(data, chartType);
  setActiveChartButton(chartType);
}

async function getCurrentChart(stock: Stock[], chartType: string) {
  if (chartType === "bubble") {
    await setStock(chartType, displayStockBubble);
    return displayStockBubble(stock);
  }
  if (chartType === "mixed") {
    await setStock(chartType, displayStockMixed);
    return displayStockMixed(stock);
  }
  await setStock(chartType, displayStockLine);
  return displayStockLine(stock);
}

export function setCurrentSelection(chartType: string, stocks: Stock[]) {
  currentSelection.set(chartType, stocks);
}
