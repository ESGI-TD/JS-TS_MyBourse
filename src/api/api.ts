import { FetchUrlError } from "../errors/apiError.js";

async function getData() {
  const url =
    "https://corsproxy.io/?url=https://query1.financzzdte.yahoo.com/v8/finance/chart/AAPL";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new FetchUrlError(`Erreur: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

const data = getData();
console.log(data);
