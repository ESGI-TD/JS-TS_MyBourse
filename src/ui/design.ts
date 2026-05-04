import { ElementNotFound } from "../errors/domError.js";
import { addError } from "../errors/handleError.js";
import { Stock } from "../models/stock.js";
import { exportStocksByChart, filterStocksByPeriod } from "./stock.js";

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
  divHeader: HTMLElement,
  stock: Stock[],
) {
  const period = [
    { name: "1S", value: 7 },
    { name: "1M", value: 30 },
    { name: "2M", value: 60 },
    { name: "3M", value: 90 },
    { name: "6M", value: 180 },
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
      setActivePeriodButton(button);
    });
    div.appendChild(button);
  });
}

function setActivePeriodButton(button: HTMLElement) {
  try {
    const buttons = document.querySelectorAll(`.chart__period__button`);
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

export function removeActivePeriodButton() {
  try {
    const buttons = document.querySelectorAll(`.chart__period__button`);
    if (!buttons) {
      throw new ElementNotFound("Erreur Class: ");
    }
    buttons.forEach((el) => {
      el.classList.remove("active");
    });
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
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

export function setExportButton(chartType: string, divHeader: HTMLElement) {
  const button = document.createElement("button");
  button.classList.add("chart__export_button");
  button.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.625 15C5.625 14.5858 5.28921 14.25 4.875 14.25C4.46079 14.25 4.125 14.5858 4.125 15H5.625ZM4.875 16H4.125H4.875ZM19.275 15C19.275 14.5858 18.9392 14.25 18.525 14.25C18.1108 14.25 17.775 14.5858 17.775 15H19.275ZM11.1086 15.5387C10.8539 15.8653 10.9121 16.3366 11.2387 16.5914C11.5653 16.8461 12.0366 16.7879 12.2914 16.4613L11.1086 15.5387ZM16.1914 11.4613C16.4461 11.1347 16.3879 10.6634 16.0613 10.4086C15.7347 10.1539 15.2634 10.2121 15.0086 10.5387L16.1914 11.4613ZM11.1086 16.4613C11.3634 16.7879 11.8347 16.8461 12.1613 16.5914C12.4879 16.3366 12.5461 15.8653 12.2914 15.5387L11.1086 16.4613ZM8.39138 10.5387C8.13662 10.2121 7.66533 10.1539 7.33873 10.4086C7.01212 10.6634 6.95387 11.1347 7.20862 11.4613L8.39138 10.5387ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM4.125 15V16H5.625V15H4.125ZM4.125 16C4.125 18.0531 5.75257 19.75 7.8 19.75V18.25C6.61657 18.25 5.625 17.2607 5.625 16H4.125ZM7.8 19.75H15.6V18.25H7.8V19.75ZM15.6 19.75C17.6474 19.75 19.275 18.0531 19.275 16H17.775C17.775 17.2607 16.7834 18.25 15.6 18.25V19.75ZM19.275 16V15H17.775V16H19.275ZM12.2914 16.4613L16.1914 11.4613L15.0086 10.5387L11.1086 15.5387L12.2914 16.4613ZM12.2914 15.5387L8.39138 10.5387L7.20862 11.4613L11.1086 16.4613L12.2914 15.5387ZM12.45 16V5H10.95V16H12.45Z" fill="#000000"></path> </g></svg>';
  button.addEventListener("click", () => {
    exportStocksByChart(chartType);
  });
  divHeader.appendChild(button);
}
