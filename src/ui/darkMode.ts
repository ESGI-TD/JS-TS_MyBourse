export function setDarkMode() {
  const sun = document.getElementById("sun") as HTMLElement;
  const moon = document.getElementById("moon") as HTMLElement;
  if (!sun || !moon) return;
  sun.addEventListener("click", () => {
    sun.classList.toggle("hide");
    moon.classList.toggle("hide");
    document.body.classList.toggle("dark_mode");
  });

  moon.addEventListener("click", () => {
    sun.classList.toggle("hide");
    moon.classList.toggle("hide");
    document.body.classList.toggle("dark_mode");
  });
}
