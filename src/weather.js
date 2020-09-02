//feature #1 display current date and time
let currentDateTime = new Date();

let dateTime = document.querySelector("#current-date-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[currentDateTime.getDay()];
let hour = currentDateTime.getHours();
let minute = currentDateTime.getMinutes();

dateTime.innerHTML = `${day} ${hour}:${minute}`;

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temperature;

  let city = response.data.name;
  let cityHeading = document.querySelector("#location");
  cityHeading.innerHTML = city.toUpperCase();

  let country = response.data.sys.country;
  let countryHeading = document.querySelector("#country");
  countryHeading.innerHTML = country;

  let humidity = response.data.main.humidity;
  let humidityHeading = document.querySelector("#humidity");
  humidityHeading.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed * 2.237);
  let windHeading = document.querySelector("#wind");
  windHeading.innerHTML = `${wind} mph`;

  let description = response.data.weather[0].description;
  let descriptionHeading = document.querySelector("#weather-description");

  descriptionHeading.innerHTML = description;
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "18abee11a17d43ab554892ec0dffc380";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "18abee11a17d43ab554892ec0dffc380";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", handleSubmit);

let geoButton = document.querySelector("#location-btn");
geoButton.addEventListener("click", getGeolocation);

searchCity("San Jose");
