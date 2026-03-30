import { getData } from "../api/api.js";
import { LineConfig, DataLine, Dataset } from "../charts/line.js";

declare const Chart: any;
async function displayLine() {
  try {
    const config = await setData();
    if (!config) {
      throw new Error();
    }
    const canvas = document.getElementById("lineChart") as HTMLCanvasElement;
    new Chart(canvas, config);
  } catch (error) {}
}

async function setData(): Promise<LineConfig | undefined> {
  try {
    const data = await getData();
    if (!data) {
      throw new Error();
    }
    const firstData = data[0];
    const dataLine: DataLine = {
      labels: firstData.history.map((res) => res.date),
      datasets: data.map(
        (stock): Dataset => ({
          label: stock.name,
          data: stock.history.map((res) => res.price),
          fill: true,
          borderColor: "rgb(192, 122, 75)",
          tension: 0.1,
        }),
      ),
    };
    const config = {
      type: "line" as const,
      data: dataLine,
    };
    return config;
  } catch (error) {
    console.log(`Erreur: ${error}`);
  }
}
displayLine();
