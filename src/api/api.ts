import { FetchUrlError } from "../errors/apiError.js";
import { Stock } from "../models/stock.js";

export async function getData(): Promise<Stock[] | void> {
  const url = "https://keligmartin.github.io/api/stocks.json";
  return fetch(url)
    .then((res): Promise<Stock[]> => {
      if (!res.ok) {
        throw new FetchUrlError(`Erreur: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Erreur: ", error);
    });
}

async function test() {
  const data = await getData();
  if (data) {
    console.log(data[0].history[0].date);
    console.log(data[0].currency);
  }
}

test();
