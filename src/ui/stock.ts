import { getData } from "../api/api.js";
import { NoData } from "../errors/apiError.js";
import { ElementNotFound } from "../errors/domError.js";
import { addError } from "../errors/handleError.js";
import { exportStocks } from "./export.js";
import {
  setActiveChartButton,
  setButton,
  setCanvas,
  setDisplayAllDataButton,
  setExportButton,
  setPeriodButton,
} from "./design.js";
import { Stock } from "../models/stock.js";
import { displayStock } from "./chart.js";
import { currentSelection } from "./chart.js";
import { displayStockBubble, updateStockBubble } from "./bubble.js";
import { displayStockLine, updateStockLine } from "./line.js";
import { updateStockMixed } from "./mixed.js";

//On attribut les actions aux boutons avec le type de graphique et la fonction associée
export async function setStock(
  chartType: string,
  functionName: (stocks: Stock[]) => Promise<void>,
) {
  try {
    const data = await getData();
    if (!data) {
      throw new NoData(`Erreur data:`);
    }
    const element = document.getElementById("charts_load") as HTMLElement;
    if (!element) {
      throw new ElementNotFound("Erreur Element: ");
    }
    const divChart = document.createElement("div") as HTMLElement;
    divChart.id = `${chartType}`;
    divChart.classList.add("chart__card");
    const divBtn = document.createElement("div") as HTMLElement;
    divBtn.classList.add("charts_button");
    divBtn.id = `${chartType}_btn`;
    element.appendChild(divChart);

    const divHeader = document.createElement("div") as HTMLElement;
    divHeader.classList.add("chart__header");
    divChart.appendChild(divHeader);
    const title = document.createElement("h2") as HTMLElement;
    title.innerHTML = `Actions - <span class="chart__span">${chartType} Chart</span>`;
    title.classList.add("chart__title");
    divHeader.appendChild(title);
    divChart.appendChild(divBtn);

    setCanvas(chartType);
    const divFooter = document.createElement("div") as HTMLElement;
    divFooter.classList.add("chart__footer");
    divChart.appendChild(divFooter);
    data.forEach((stock) => {
      setButton(chartType, stock, functionName);
      setFooterChart(divFooter, stock);
    });
    setDisplayAllDataButton(chartType, data, functionName);
    setPeriodButton(chartType, divHeader, data);
    setExportButton(chartType, divHeader);
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
}

async function setFooterChart(div: HTMLElement, stock: Stock) {
  const divfooterCard = document.createElement("div") as HTMLElement;
  divfooterCard.classList.add("chart__footer_card");
  div.appendChild(divfooterCard);
  const percent = await setActionPercent(stock);
  divfooterCard.innerHTML = `<div class="chart__footer_card_title"><div></div><h3>${stock.name}</h3></div><p>${stock.currency}</p><p>${percent}</p>`;
}

export async function setActionPercent(stock: Stock) {
  const prevStock = stock.history[stock.history.length - 1].price;
  const percent = ((stock.currentPrice - prevStock) / prevStock) * 100; //On calc le % en comparant la current action avec l'avant derniere
  if (percent <= 0) {
    return `<span class="track__bad">${percent.toFixed(2)}%</span>`;
  }
  return `<span class="track__good">+${percent.toFixed(2)}%</span>`;
}

export async function filterStocksByPeriod(days: number, chartType: string) {
  const stocks = currentSelection.get(chartType) ?? [];
  const date = new Date();
  date.setDate(date.getDate() - days);
  const filteredData = stocks.map((stock) => ({
    ...stock,
    history: stock.history.filter((h) => new Date(h.date) >= date),
  }));
  if (chartType === "line") {
    updateStockLine(filteredData);
  }
  if (chartType === "bubble") {
    updateStockBubble(filteredData);
  }
  if (chartType === "mixed") {
    updateStockMixed(filteredData);
  }
}

export function setChartSelectButton(chartType: string) {
  const div = document.getElementById("charts_select") as HTMLElement;
  const chartButton = document.createElement("button") as HTMLButtonElement;
  chartButton.classList.add("stock_btn", "stock_chart_btn");
  chartButton.id = `stock_chart_btn_${chartType}`;
  chartButton.innerHTML = `${chartType}`;
  chartButton.addEventListener("click", () => {
    displayStock(chartType);
  });
  div.appendChild(chartButton);
}

export function removeChart() {
  const chartDiv = document.getElementById("charts_load") as HTMLElement;
  chartDiv.innerHTML = "";
}

export function exportStocksByChart(chartType: string) {
  const stocks = currentSelection.get(chartType) ?? [];
  if (stocks.length === 0) return;
  exportStocks(stocks, chartType);
}
