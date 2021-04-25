function showTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formatDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  return formatDate;
}

let now = new Date();
let currentTime = document.querySelector("#date-time");
currentTime.innerHTML = showTime(now);

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
}

function searchCity(city) {
  let apiKey = "633a901d15239b95c1fd6a7642839e6b";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Las Vegas");

function retrievePosition(position) {
  let apiKey = "633a901d15239b95c1fd6a7642839e6b";
  let units = "imperial";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

function showGPS(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", showGPS);
