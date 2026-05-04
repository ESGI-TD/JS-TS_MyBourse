import {
  BubbleConfig,
  BubbleData,
  DataBubble,
  Dataset,
} from "../charts/bubble.js";
import { NoData } from "../errors/apiError.js";
import { ElementNotFound } from "../errors/domError.js";
import { addError } from "../errors/handleError.js";
import { Stock } from "../models/stock.js";
import { setCurrentSelection } from "./chart.js";
import { removeActivePeriodButton } from "./design.js";
import { colors } from "../charts/colors.js";

declare const Chart: any;
let bubbleChart: any = null;

//Création de la config du graphique à partir des data (utilisation des Type pour les assigner)
export async function setBubbleChartData(
  stock: Stock[],
): Promise<BubbleConfig | undefined> {
  try {
    const data = stock;
    if (!data || data.length === 0) {
      throw new NoData("Erreur data: ");
    }
    const dataBubble: DataBubble = {
      datasets: data.map(
        (stock, i): Dataset => ({
          label: stock.name,
          data: [buildBubblePoint(stock)],
          backgroundColor: colors[i],
        }),
      ),
    };

    const config: BubbleConfig = {
      type: "bubble" as const,
      data: dataBubble,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Prix actuel",
            },
          },
          y: {
            title: {
              display: true,
              text: "Prix moyen historique",
            },
          },
        },
      },
    };
    return config;
  } catch (error) {
    addError((error as Error).message + (error as Error).name);
  }
}

function buildBubblePoint(stock: Stock): BubbleData {
  const historyLength = stock.history.length;
  const totalPrice = stock.history.reduce((sum, item) => sum + item.price, 0);
  const totalVolume = stock.history.reduce((sum, item) => sum + item.volume, 0);
  const averagePrice =
    historyLength > 0 ? totalPrice / historyLength : stock.currentPrice;
  const averageVolume = historyLength > 0 ? totalVolume / historyLength : 0;

  return {
    x: stock.currentPrice,
    y: Number(averagePrice.toFixed(2)),
    r: Math.max(6, Math.min(24, Math.sqrt(averageVolume) / 20)),
  };
}

//Affichage du graphique dans le DOM
export async function displayStockBubble(stock: Stock[]) {
  removeActivePeriodButton();
  const config = await setBubbleChartData(stock);
  if (!config) {
    throw new NoData("Erreur config: ");
  }
  const canvas = document.getElementById(
    "bubbleChart",
  ) as HTMLCanvasElement | null;
  if (!canvas) {
    throw new ElementNotFound("Erreur Element: ");
  }

  bubbleChart?.destroy();
  bubbleChart = new Chart(canvas, config);
  setCurrentSelection("bubble", stock);
}

export async function updateStockBubble(stock: Stock[]) {
  const config = await setBubbleChartData(stock);
  if (!config) {
    throw new NoData("Erreur config: ");
  }
  const canvas = document.getElementById(
    "bubbleChart",
  ) as HTMLCanvasElement | null;
  if (!canvas) {
    throw new ElementNotFound("Erreur Element: ");
  }

  bubbleChart?.destroy();
  bubbleChart = new Chart(canvas, config);
}
