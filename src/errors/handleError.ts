import { ElementNotFound } from "./domError.js";
const allErrors: string[] = [];
export function addError(error: string): void {
  allErrors.push(error);
  displayError();
}

function displayError(): void {
  try {
    const element = document.getElementById("errors") as HTMLElement;
    if (!element) {
      throw new ElementNotFound("Erreur:");
    }
    element.innerHTML = "";
    allErrors.forEach((error) => {
      element.innerHTML += `<p>${error}</p>`;
    });
  } catch (error) {
    console.log(`Erreur: ${error}`);
  }
}
