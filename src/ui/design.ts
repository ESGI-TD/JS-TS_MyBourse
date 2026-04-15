import { ElementNotFound } from "../errors/domError.js";
import { addError } from "../errors/handleError.js";
import { Stock } from "../models/stock.js";

export function setActiveButton(button: HTMLButtonElement, chartType: string) {
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
    setActiveButton(button, chartType);
    functionName([stock]);
  });
  div.appendChild(button);
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
    setActiveButton(button, chartType);
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
