//Feature #1
let currentDate = new Date();

function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formedDate = `${day}, ${hour}:${minutes}`;

  return formedDate;
}
let dateLine = document.querySelector(".current-date");
dateLine.innerHTML = formatDate(currentDate);

//Farenheit to Celcius
function showFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#current-temp");
  farenheitTemp.innerHTML = `80°`;
}
function showCelciusTemp(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#current-temp");
  celciusTemp.innerHTML = `27°`;
}

let farenheitTemp = document.querySelector("#farenheit-link");
farenheitTemp.addEventListener("click", showFarenheitTemp);

let celciusTemp = document.querySelector("#celcius-link");
celciusTemp.addEventListener("click", showCelciusTemp);

// Homework 5
function showTemperature(response) {
  let cityName = document.querySelector(".main-city");
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = `${temperature}°`;
  let weatherText = response.data.weather[0].main;
  let iconText = document.querySelector(".icon-text");
  iconText.innerHTML = `${weatherText}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedDisplay = document.querySelector(".wind-speed");
  windSpeedDisplay.innerHTML = ` ${windSpeed}km/h`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityDisplay = document.querySelector(".humidity");
  humidityDisplay.innerHTML = ` ${humidity}%`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let mainCity = document.querySelector(".main-city");
  if (searchInput.value) {
    mainCity.innerHTML = `${searchInput.value}`;
  } else {
    mainCity.innerHTML = "Vega Baja";
    alert("Please, enter the city");
  }

  let apiKey = "d8a6d95268ca26b8e634c68cc177bb31";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "d8a6d95268ca26b8e634c68cc177bb31";
  let apiEndpoint = "http://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let form = document.querySelector(".search-tab");
form.addEventListener("submit", search);

// Geolocation
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);
