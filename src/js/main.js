import { displayDateTime, months } from "./date.js";

// Toggle NavBar
document.querySelector(".nav-toggler").addEventListener("click", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("navbar--visible");
});

// Get APIKey
const apiKey = "f930a8b2e71bc550aac09c0222dd9f2d";
const forecastApiKey = "bb54be0147ot8a4cca9066da1f16f233";

// Set the Current Date
const date = document.querySelector("#date");
const time = document.querySelector("#time");
displayDateTime(date, time);

// Convert timestamp
function convertTimestamp(timestamp) {
  const timestampMilliseconds = timestamp * 1000;
  const now = new Date(timestampMilliseconds);
  const month = months[now.getMonth()];
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return { month, date, hours, minutes };
}

// Display the Weather data
function displayWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(
        ".weather-icon"
      ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.querySelector(".weather-icon").alt = data.weather[0].description;
      document.querySelector("#temperature").textContent = data.main.temp;
      document.querySelector("#description").textContent =
        data.weather[0].description;
      document.querySelector(
        "#location"
      ).textContent = `${data.name}, ${data.sys.country}`;
      document.querySelector("#clouds").textContent = `${data.clouds.all}%`;
      document.querySelector("#max-temp").textContent = `${data.main.temp_max}°C`;
      document.querySelector("#min-temp").textContent = `${data.main.temp_min}°C`;
      document.querySelector(
        "#feels-like"
      ).textContent = `${data.main.feels_like}°C`;
      document.querySelector("#wind").textContent = `${data.wind.speed} km/h`;
      document.querySelector("#visibility").textContent = `${
        data.visibility / 1000
      }.0 km`;
      document.querySelector(
        "#pressure"
      ).textContent = `${data.main.pressure} mb`;
      document.querySelector("#humidity").textContent = `${data.main.humidity} %`;
      const sunrise = convertTimestamp(data.sys.sunrise);
      document.querySelector(
        "#sunrise"
      ).textContent = `${sunrise.hours}:${sunrise.minutes} am`;
      const sunset = convertTimestamp(data.sys.sunset);
      document.querySelector(
        "#sunset"
      ).textContent = `${sunset.hours}:${sunset.minutes} pm`;
    });
}

// Weather Forecast
async function forecast(lat, lon) {
  const url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${forecastApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const result = data.daily.slice(1, 5);
  result.map((value) => {
    const tomorrow = convertTimestamp(value.time);
    const forecast = `<div class="forecast-col">
          <img src="${value.condition.icon_url}" alt="${value.condition.icon}">
          <p class="forecast-temp">${value.temperature.day.toFixed(1)}°C</p>
          <p class="forecast-day" id="forecast-date">${tomorrow.date} ${
      tomorrow.month
    }</p>
        </div>`;
    document
      .querySelector(".forecast-row")
      .insertAdjacentHTML("beforeend", forecast);
  });
}

// Weather of current position
navigator.geolocation.getCurrentPosition(currentPosition);
function currentPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  displayWeather(lat, lon);
  forecast(lat, lon);
}

// Image carousel
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = `https://source.unsplash.com/random/600x300/?weather&sig=${Date.now()}`;
  const imageElement = document.getElementById("picture");
  function showImage(url) {
    imageElement.src = url;
  }
  function nextImage() {
    const timestamp = Date.now();
    const newUrl = `https://source.unsplash.com/random/600x300/?weather&sig=${timestamp}`;
    showImage(newUrl);
  }
  // Show the initial image
  showImage(apiUrl);
  setInterval(nextImage, 5000);
});

// Search Form
let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const searchQuery = document.querySelector("#search-input").value;
    if (!searchQuery) {
      alert('Must provide a city to search...');
      throw new Error('No search query found');
    }
    localStorage.setItem("searchQuery", searchQuery);
    window.location.href = './src/search.html';
});
