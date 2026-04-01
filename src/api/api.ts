import { FetchUrlError } from "../errors/apiError.js";
import { Stock } from "../models/stock.js";

//Fetch l'API pour récupérer les data
export async function getData(): Promise<Stock[] | void> {
  const url = "https://keligmartin.github.io/api/stocks.json";
  return fetch(url)
    .then((res): Promise<Stock[]> => {
      //On utilise l'interface Stock pour récupérer les data
      if (!res.ok) {
        throw new FetchUrlError(`Erreur: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Erreur: ", error);
    });
}
