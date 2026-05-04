import { colors } from "../charts/colors.js";
import { DataMixed, MixedConfig, MixedDataset } from "../charts/mixed.js";
import { NoData } from "../errors/apiError.js";
import { ElementNotFound } from "../errors/domError.js";
import { addError } from "../errors/handleError.js";
import { Stock } from "../models/stock.js";
import { setCurrentSelection } from "./chart.js";
import { removeActivePeriodButton } from "./design.js";

declare const Chart: any;
let mixedChart: any = null;

async function setMixedChartData(
  stocks: Stock[],
): Promise<MixedConfig | undefined> {
  try {
    if (!stocks || stocks.length === 0) {
      throw new NoData("Erreur data: ");
    }

    const labels = stocks[0].history.map((res) => res.date);
    const datasets: MixedDataset[] = [];

    stocks.forEach((stock, i) => {
      datasets.push({
        type: "bar",
        label: `${stock.name} - Volume`,
        data: stock.history.map((res) => res.volume),
        yAxisID: "y",
        backgroundColor: "rgba(54, 162, 235, 0.35)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        order: 2,
      });

      datasets.push({
        type: "line",
        label: `${stock.name} - Prix`,
        data: stock.history.map((res) => res.price),
        yAxisID: "y1",
        borderColor: colors[i],
        backgroundColor: "rgba(192, 122, 75, 0.2)",
        tension: 0.2,
        order: 1,
      });
    });

    const dataMixed: DataMixed = {
      labels,
      datasets,
    };

    const config: MixedConfig = {
      data: dataMixed,
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: "Volume",
            },
          },
          y1: {
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
            title: {
              display: true,
              text: "Prix",
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

export async function displayStockMixed(stocks: Stock[]) {
  removeActivePeriodButton();
  const config = await setMixedChartData(stocks);
  if (!config) {
    throw new NoData("Erreur config: ");
  }
  const canvas = document.getElementById(
    "mixedChart",
  ) as HTMLCanvasElement | null;
  mixedChart?.destroy();
  mixedChart = new Chart(canvas, config);
  setCurrentSelection("mixed", stocks);
}

export async function updateStockMixed(stocks: Stock[]) {
  const config = await setMixedChartData(stocks);
  if (!config) {
    throw new NoData("Erreur config: ");
  }

  const canvas = document.getElementById(
    "mixedChart",
  ) as HTMLCanvasElement | null;
  if (!canvas) {
    throw new ElementNotFound("Erreur Element: ");
  }

  mixedChart?.destroy();
  mixedChart = new Chart(canvas, config);
}
