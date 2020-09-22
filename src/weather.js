
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

//time stamp for forecast
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


//DISPLAYING THE CURRENT WEATHER
function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  
  let city = response.data.name;
  let cityHeading = document.querySelector("#location");
  
  let country = response.data.sys.country;
  let countryHeading = document.querySelector("#country");
  
  let humidity = response.data.main.humidity;
  let humidityHeading = document.querySelector("#humidity");
  
  let wind = Math.round(response.data.wind.speed * 2.237);
  let windHeading = document.querySelector("#wind");
  
  let description = response.data.weather[0].description;
  let descriptionHeading = document.querySelector("#weather-description");
  
  let iconElement = document.querySelector("#weather-icon");

  celsiusTemp= response.data.main.temp;
  
  currentTemp.innerHTML= Math.round(celsiusTemp);
  cityHeading.innerHTML = city.toUpperCase();
  countryHeading.innerHTML = country;
  humidityHeading.innerHTML = `${humidity}%`;
  windHeading.innerHTML = `${wind} mph`;
  descriptionHeading.innerHTML = description.charAt(0).toUpperCase() + description.slice(1);

iconElement.setAttribute("src",  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) ;
iconElement.setAttribute("alt", response.data.weather[0].description);
}
// 6 day forecast display 
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="row">
    <div class="col">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weathe-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
      </div>
    </div>
  `;
  }
}


function searchCity(city) {
  let units = "metric";
  let apiKey = "18abee11a17d43ab554892ec0dffc380";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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






function showFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = ( celsiusTemp * 9 ) / 5 + 32;
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event)
{
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
temperatureElement.innerHTML= Math.round(celsiusTemp);

}

let celsiusTemp= null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);


searchCity("San Jose");