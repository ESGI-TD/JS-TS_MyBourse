import { ElementNotFound } from "../errors/domError.js";
import { addError } from "../errors/handleError.js";

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
