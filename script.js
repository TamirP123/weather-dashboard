var weatherInfo = $("#weatherCardInfo");
var forecastContainerEl = $("#forecastContainer");
var buttonContainerEl = $("#buttonContainer");

var apiKey = "8782fbdc8ad65017cca5cc8fc9745533";
var searched = [];

function storeCity() {
  // Saving to local storage
  localStorage.setItem("searched", JSON.stringify(searched));
}

function previousCityButton(userCity) {
  var cityButton = $(`<button type="button" class="btn btn-secondary 
  btn-block mt-1 previousCity">${userCity}</button>`);

  buttonContainerEl.append(cityButton);

  // Push the city into the array of searched cities and save to local storage
  searched.push(userCity);
  storeCity();
}

function init() {
  // Retrieve stored city if any
  var storedCities = JSON.parse(localStorage.getItem("searched"));

  if (storedCities !== null) {
    searched = storedCities;
  }
renderStoredCities();
}

function renderStoredCities() {
  // For loop to go through any saved cities
  for (var i = 0; i < searched.length; i++) {
    var searchedCity = searched[i];

  var cityButton = $(`<button type="button" class="btn btn-secondary 
  btn-block mt-1 previousCity">${searchedCity}</button>`);

  buttonContainerEl.append(cityButton);
  }
}

function renderWeatherCard(data) {
  weatherInfo.empty();

  var weatherCardEl = $(`<div class="card-body" id="weather-info"></div>`);

  // Creating title of city for the card.

  var weatherCardTitle = $(`<h5 class="card-title">${data.name}${dayjs().format(
    "(M/D/YYYY)"
  )}
  <span> 
  <img src="http://openweathermap.org/img/w/${
    data.weather[0].icon
  }.png"></img> </span></h5>`);

  // Creating temperature tag
  var weatherTemp = $(
    `<h6 class="card-subtitle mb-2 text-muted">Temp: ${data.main.temp} °F</h6>`
  );

  // Creating wind speed tag

  var weatherSpeed = $(
    `<h6 class="card-subtitle mb-2 mt-2 text-muted">Wind Speed: ${data.wind.speed} MPH</h6>`
  );

  // Creating humidity tag

  var weatherHumidity = $(
    `<h6 class="card-subtitle mb-2 mt-2 text-muted">Humidity: ${data.main.humidity}%</h6>`
  );

  // Append card with info to the page.
  weatherInfo.append(weatherCardEl);
  weatherCardEl.append(weatherCardTitle);
  weatherCardEl.append(weatherTemp);
  weatherCardEl.append(weatherSpeed);
  weatherCardEl.append(weatherHumidity);
}

function fiveDayForecast(userCity) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&units=imperial&appid=${apiKey}`;

  console.log("Ran");
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("City not found!");
      }
    })
    .then(function (data) {
      console.log(data);
      // Renders the five day forecast
      renderFiveDay(data);
    });
}

function renderFiveDay(data) {
  forecastContainerEl.empty();
  // Loops through the data list, increments by 8 because it is every 3 hours per day
  for (var i = 0; i < data.list.length; i += 8) {
    // Grabs the current day
    var day = data.list[i];
    // Formats the day 
    var unixFormat = dayjs.unix(day.dt).format("M/D/YYYY");
    // Create element for each day with info
    var divEl = $(`<div class="col-12 col-lg-2">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${unixFormat}</h5>
      <span> <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png"></img> </span>
      <p class="card-text">Temp: ${day.main.temp} °F</p>
      <p class="card-text">Wind Speed: ${day.wind.speed} MPH</p>
      <p class="card-text">Humidity: ${day.main.humidity}%</p>
    </div>
  </div>
</div>`);
    forecastContainerEl.append(divEl);
  }
}

function getCurrentWeather(userCity) {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${apiKey}`;

  console.log("Ran");
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("City not found!");
      }
    })
    .then(function (data) {
      console.log(data);
      // Creates the card with the city info on it.
      renderWeatherCard(data);
    });
}

function previousButtonHandler(event) {
  // Grabs city name
  var userCity = $(this).text();
  console.log(userCity);
  // previousCityButton(userCity);
  getCurrentWeather(userCity);
  fiveDayForecast(userCity);
}

function searchButtonHandler(event) {
  event.preventDefault();
  // Grabs city name
  var userCity = $("#cityEntry").val();

  previousCityButton(userCity);
  getCurrentWeather(userCity);
  fiveDayForecast(userCity);
}

function clearButtonHandler() {
  // Clears local storage
  window.localStorage.clear();

  // Clears the buttons
  buttonContainerEl.empty();

  searched = [];
}

$("#searchBtn").on("click", searchButtonHandler);
$('#clearBtn').on('click', clearButtonHandler);
buttonContainerEl.on("click", ".previousCity", previousButtonHandler);


init();
