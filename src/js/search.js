import { displayDateTime } from "./date.js";

let query = localStorage.getItem("searchQuery");

// Get APIKey
const apiKey = "f930a8b2e71bc550aac09c0222dd9f2d";

// Set the Current Date
const date = document.querySelector("#date");
const time = document.querySelector("#time");
displayDateTime(date, time);

// Search Result
document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(
        ".location"
      ).textContent = `${data.name}, ${data.sys.country}`;
      document.querySelector(".temperature").textContent = `${data.main.temp}°C`;
      document.querySelector(".main").textContent = `${data.weather[0].main}`;
      document.querySelector(
        ".description"
      ).textContent = `${data.weather[0].description}`;
      document.querySelector("#wind").textContent = `${data.wind.speed} km/h`;
      document.querySelector(
        "#pressure"
      ).textContent = `${data.main.pressure} mb`;
      document.querySelector("#humidity").textContent = `${data.main.humidity} %`;
      let value = query.split(" ").join("-");
      let image = `url(https://source.unsplash.com/1600x900/?${value}) center center/cover no-repeat`
        if(image) {
            document.body.style.background = image;
            document.body.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        }
    });
});