import { getData } from "../api/api.js";

export async function setTrack() {
  const track = document.getElementById("track") as HTMLElement;
  const data = await getData();
  if (!data) return;
  //On se base sur 6 itération car sinon on manque de contenu pour avoir un scroll fluide
  for (let i = 0; i < 6; i++) {
    data.forEach((action) => {
      const prevStock = action.history[action.history.length - 1].price;
      const percent = ((action.currentPrice - prevStock) / prevStock) * 100; //On calc le % en comparant la current action avec l'avant derniere
      let result = `<span class="track__bad track">${percent.toFixed(2)}%</span>`;
      if (percent >= 0) {
        result = `<span class="track__good track">+${percent.toFixed(2)}%</span>`;
      }
      const p = document.createElement("p") as HTMLElement;
      p.innerHTML = `<p>${action.symbol} ${action.currentPrice} ${result}</p>`;
      track.appendChild(p);
    });
  }
}
