import { getData } from "../api/api.js";
import { LineConfig, DataLine, Dataset } from "../charts/line.js";
import { NoData } from "../errors/apiError.js";
import { addError } from "../errors/handleError.js";
import { Stock } from "../models/stock.js";

declare const Chart: any;
let lineChart: any = null;

//Création de la config du graphique à partir des data (utilisation des Type pour les assigner)
async function setLineChartData(
  stock: Stock[],
): Promise<LineConfig | undefined> {
  const colors = ["#4F8EF7", "#3DDC84", "#FFB020", "#8B5CF6", "#F53B57"];
  try {
    const data = stock;
    if (!data) {
      throw new NoData("Erreur data: ");
    }
    const firstData = data[0];
    const dataLine: DataLine = {
      labels: firstData.history.map((res) => res.date),
      datasets: data.map(
        (stock, i): Dataset => ({
          label: stock.name,
          data: stock.history.map((res) => res.price),
          fill: false,
          borderColor: colors[i],
          backgroundColor: colors[i],
          pointRadius: 2,
          pointHoverRadius: 8,
          tension: 0.1,
        }),
      ),
    };

    const config = {
      type: "line" as const,
      data: dataLine,
      options: {
        interaction: {
          mode: "index",
          intersect: false,
        },
      },
    };
    return config;
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
}

//Affichage du graphique dans le DOM
export async function displayStockLine(stock: Stock[]) {
  const config = await setLineChartData(stock);
  if (!config) {
    throw new NoData("Erreur config: ");
  }
  const canvas = document.getElementById("lineChart") as HTMLCanvasElement;
  lineChart?.destroy();
  lineChart = new Chart(canvas, config);
}
