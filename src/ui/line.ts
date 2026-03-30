import { getData } from "../api/api.js";
declare const Chart: any;
async function displayLine() {
  try {
    const config = await setData();
    if (!config) {
      throw new Error();
    }
    console.log(config);
    const canvas = document.getElementById("lineChart") as HTMLCanvasElement;
    new Chart(canvas, config);
  } catch (error) {}
}

async function setData() {
  try {
    const data = await getData();
    if (!data) {
      throw new Error();
    }

    const firstData = data[0];
    const labels = firstData.history.map((res) => res.date);
    const dataLine = {
      labels: labels,
      datasets: data.map((stock) => ({
        label: stock.name,
        data: stock.history.map((res) => res.price),
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      })),
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
