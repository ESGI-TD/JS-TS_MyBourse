import { setChartSelectButton, setStock } from "./ui/stock.js";
import { displayStockLine } from "./ui/line.js";
import { displayStockBubble } from "./ui/bubble.js";
import { getData } from "./api/api.js";
import { NoData } from "./errors/apiError.js";
import { addError } from "./errors/handleError.js";
import { setDarkMode } from "./ui/darkMode.js";
import { setTrack } from "./ui/track.js";
import { displayStock } from "./ui/chart.js";

//Initialisation des graphiques
async function loadCharts() {
  try {
    const data = await getData();
    if (!data) {
      throw new NoData("Erreur data: ");
    }
    const currentChart = localStorage.getItem("chart"); //On récupere le dernier type de graphique selectionné par l'utilisateur pour l'afficher
    if (currentChart) {
      displayStock(currentChart);
    } else {
      displayStock("line");
    }
    document.querySelectorAll(".loading").forEach((el) => el.remove()); //On retire le "chargement" une fois les graphiques affichées
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
}
setChartSelectButton("line");
setChartSelectButton("bubble");
setChartSelectButton("mixed");

//setStock("line", displayStockLine); //Setup chartLine button (on passe le type de chart + le nom de la fonction à appeler)
//setStock("bubble", displayStockBubble); //Setup chartBubble button
setDarkMode(); //Set le dark mode
loadCharts(); //charge les graphiques
setTrack(); //Set le layer en haut de page
