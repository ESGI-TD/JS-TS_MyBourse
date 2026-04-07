export function setDarkMode() {
  const sun = document.getElementById("sun") as HTMLElement;
  const moon = document.getElementById("moon") as HTMLElement;
  if (!sun || !moon) return;
  const localDarkMode = localStorage.getItem("dark_mode");
  if (localDarkMode === "moon") {
  }
  sun.addEventListener("click", () => {
    sun.classList.toggle("hide");
    moon.classList.toggle("hide");
    document.body.classList.toggle("dark_mode");
    localStorage.setItem("darkmode", "sun");
  });

  moon.addEventListener("click", () => {
    sun.classList.toggle("hide");
    moon.classList.toggle("hide");
    document.body.classList.toggle("dark_mode");
    localStorage.setItem("darkmode", "moon");
  });
}
