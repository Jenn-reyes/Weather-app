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







function searchButton(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let currentCity = document.querySelector(".current-city");
      currentCity.innerHTML = `${searchInput.value}`;
      searchInput.value = currentCity.innerHTML;
    } 
  let searchInput = document.querySelector("#search-input");
  let searchCity = document.querySelector("#search-button");
  if (searchCity && searchInput !== undefined){
      let searchEvent = searchCity.addEventListener("click", searchButton);
      let searchEvent2 = searchInput.addEventListener("submit", searchButton);
  }
else{
    alert(`Please enter a city`);
}