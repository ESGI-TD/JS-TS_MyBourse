import { ElementNotFound } from "../errors/domError.js";
import { addError } from "../errors/handleError.js";
import { Stock } from "../models/stock.js";
import { filterStocksByPeriod } from "./stock.js";

export function setActiveStockButton(
  button: HTMLButtonElement,
  chartType: string,
) {
  try {
    const buttons = document.querySelectorAll(`.stock_${chartType}_btn`);
    if (!buttons) {
      throw new ElementNotFound("Erreur Class: ");
    }
    buttons.forEach((el) => {
      el.classList.remove("active");
    });
    button.classList.add("active");
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
}

//On vient créer les boutons correspondant à leurs chartType puis on les insères dans la section correspondante
export function setButton(
  chartType: string,
  stock: Stock,
  functionName: (stocks: Stock[]) => Promise<void>,
) {
  const div = document.getElementById(`${chartType}_btn`) as HTMLElement;
  const button = document.createElement("button");
  button.className = `stock_${chartType}_btn stock_btn`;
  button.textContent = stock.name;
  button.addEventListener("click", () => {
    setActiveStockButton(button, chartType);
    functionName([stock]);
  });
  div.appendChild(button);
}

export function setPeriodButton(
  chartType: string,
  functionName: (stocks: Stock[]) => Promise<void>,
  divHeader: HTMLElement,
) {
  const period = [
    { name: "1S", value: 7 },
    { name: "1M", value: 30 },
    { name: "3M", value: 90 },
    { name: "6M", value: 180 },
    { name: "1A", value: 365 },
  ];
  const div = document.createElement("div") as HTMLElement;
  div.classList.add(`${chartType}__header__period`);
  divHeader.appendChild(div);
  period.forEach((res) => {
    const button = document.createElement("button") as HTMLElement;
    button.classList.add("chart__period__button");
    button.innerHTML = `${res.name}`;
    button.addEventListener("click", () => {
      filterStocksByPeriod(res.value, chartType);
    });
    div.appendChild(button);
  });
}

export function setDisplayAllDataButton(
  chartType: string,
  stock: Stock[],
  functionName: (stocks: Stock[]) => Promise<void>,
) {
  const div = document.getElementById(`${chartType}_btn`) as HTMLElement;
  const button = document.createElement("button");
  button.className = `stock_${chartType}_btn active stock_btn`;
  button.textContent = "Afficher toutes les actions";
  button.addEventListener("click", () => {
    setActiveStockButton(button, chartType);
    functionName(stock);
  });
  div.appendChild(button);
}
export function setCanvas(chartType: string) {
  const div = document.getElementById(chartType) as HTMLElement;
  const canva = document.createElement("canvas") as HTMLElement;
  canva.classList.add("chart");
  canva.id = `${chartType}Chart`;
  div.appendChild(canva);
}

export function setActiveChartButton(chartType: string) {
  try {
    const button = document.getElementById(`stock_chart_btn_${chartType}`);
    const buttons = document.querySelectorAll(`.stock_chart_btn`);
    if (!buttons) {
      throw new ElementNotFound("Erreur Class: ");
    }
    buttons.forEach((el) => {
      el.classList.remove("active");
    });
    button?.classList.add("active");
    saveLastChartSelected(chartType);
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
}

function saveLastChartSelected(chartType: string) {
  localStorage.setItem("chart", chartType);
}
