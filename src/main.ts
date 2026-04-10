import { setStock } from "./ui/stock.js";
import { displayStockLine } from "./ui/line.js";
import { displayStockBubble } from "./ui/bubble.js";
import { getData } from "./api/api.js";
import { NoData } from "./errors/apiError.js";
import { addError } from "./errors/handleError.js";
import { setDarkMode } from "./ui/darkMode.js";

//Initialisation des graphiques
async function loadCharts() {
  try {
    const data = await getData();
    if (!data) {
      throw new NoData("Erreur data: ");
    }
    displayStockLine(data);
    displayStockBubble(data);
    document.querySelectorAll(".loading").forEach((el) => el.remove()); //On retire le "chargement" une fois les graphiques affichées
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
}

loadCharts();
setStock("line", displayStockLine); //Setup chartLine button (on passe le type de chart + le nom de la fonction à appeler)
setStock("bubble", displayStockBubble); //Setup chartBubble button
setDarkMode();
