import { getData } from "../api/api.js";
import { NoData } from "../errors/apiError.js";
import { ElementNotFound } from "../errors/domError.js";
import { addError } from "../errors/handleError.js";
import {
  setActiveButton,
  setButton,
  setCanvas,
  setDisplayAllDataButton,
} from "./design.js";
import { Stock } from "../models/stock.js";

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
    const divBtn = document.createElement("div") as HTMLElement;
    divBtn.classList.add("charts_button");
    divBtn.id = `${chartType}_btn`;
    element.appendChild(divChart);

    const title = document.createElement("h2") as HTMLElement;
    title.innerHTML = `Actions ${chartType} Chart`;
    divChart.appendChild(title);
    divChart.appendChild(divBtn);

    setCanvas(chartType);
    data.forEach((stock) => {
      setButton(chartType, stock, functionName);
    });
    setDisplayAllDataButton(chartType, data, functionName);
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
}
