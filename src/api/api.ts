import { FetchUrlError } from "../errors/apiError.js";

async function getData() {
  const url = "https://keligmartin.github.io/api/stocks.json";
  return fetch(url)
    .then((res) => {
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
  console.log(data);
}

test();
