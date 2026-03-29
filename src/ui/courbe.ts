import { getData } from "../api/api.js";

async function displayCourbe() {
  const data = await getData();
  if (data) {
    console.log(data);
  }
}

displayCourbe();
