import { getData } from "../api/api.js";
import { NoData } from "../errors/apiError.js";
import { ElementNotFound } from "../errors/domError.js";
import { addError } from "../errors/handleError.js";
import { setActiveButton } from "./design.js";
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
    const element = document.getElementById("stocks") as HTMLElement;
    if (!element) {
      throw new ElementNotFound("Erreur Element: ");
    }

    data.forEach((stock) => {
      const button = document.createElement("button");
      button.className = `stock_${chartType}_btn`;
      button.textContent = stock.name;
      button.addEventListener("click", () => {
        setActiveButton(button, chartType);
        functionName([stock]);
      });
      element.appendChild(button);
    });
    const allButton = document.createElement("button");
    allButton.className = `stock_${chartType}_btn active`;
    allButton.textContent = "Afficher toutes les actions";
    allButton.addEventListener("click", () => {
      setActiveButton(allButton, chartType);
      functionName(data);
    });
    element.appendChild(allButton);
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
}
