export function setDarkMode() {
  const sun = document.getElementById("sun") as HTMLElement;
  const moon = document.getElementById("moon") as HTMLElement;
  if (!sun || !moon) return;
  //Setup darkmode au démarrage si l'utilisateur l'a sélectionné précédemment
  const localDarkMode = localStorage.getItem("darkmode");
  if (localDarkMode === "moon") {
    toggleDarkMode(sun, moon, "moon");
  }
  sun.addEventListener("click", () => toggleDarkMode(sun, moon, "sun"));
  moon.addEventListener("click", () => toggleDarkMode(sun, moon, "moon"));
}

//On utilise toggle pour ajouter/retirer en fonction du state précédent et on change le localStorage pour garder les préférences
function toggleDarkMode(
  sun: HTMLElement,
  moon: HTMLElement,
  currentMode: string,
) {
  sun.classList.toggle("hide");
  moon.classList.toggle("hide");
  document.body.classList.toggle("dark_mode");
  localStorage.setItem("darkmode", currentMode);
}
