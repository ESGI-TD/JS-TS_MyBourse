import { displayStockLine, setLineChartData } from "./line";
import { NoData } from "../errors/apiError.js";
import { Stock } from "../models/stock.js";
import { displayStockBubble, setBubbleChartData } from "./bubble";
import { getData } from "../api/api";
import { removeChart, setStock } from "./stock";
import { setActiveChartButton } from "./design";

declare const Chart: any;
export let chart: any = null;

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
  await setStock(chartType, displayStockLine);
  return displayStockLine(stock);
}
