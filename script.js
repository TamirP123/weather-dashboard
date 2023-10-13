var weatherInfo = $("#weatherCardInfo");
var forecastContainerEl = $("#forecastContainer");
var buttonContainerEl = $("#buttonContainer");

var apiKey = "8782fbdc8ad65017cca5cc8fc9745533";




function previousCityButton (userCity) {
  var cityButton = $(`<button type="button" class="btn btn-secondary 
  btn-block mt-1 previousCity">${userCity}</button>`);

buttonContainerEl.append(cityButton);
}

function renderWeatherCard(data) {
  weatherInfo.empty();
  var weatherCardEl = $("<div>", {
    class: "card-body",
    id: "weather-info",
  });

  // Creating title of city for the card.
  var weatherCardTitle = $("<h5>", {
    class: "card-title",
  });

  // Creating temperature tag
  var weatherTemp = $("<h6>", {
    class: "card-subtitle mb-2 p-1 text-muted",
  });

  // Creating wind speed tag
  var weatherSpeed = $("<h6>", {
    class: "card-subtitle mb-2 p-1 text-muted",
  });

  // Creating humidity tag
  var weatherHumidity = $("<h6>", {
    class: "card-subtitle mb-2 p-1 text-muted",
  });

  weatherSpeed.text(`Wind Speed: ${data.wind.speed} MPH`);
  weatherTemp.text(`Temp: ${data.main.temp} °F`);
  weatherCardTitle.text(`${data.name}${dayjs().format("(M/D/YYYY)")}`);
  weatherHumidity.text(`Humidity: ${data.main.humidity}%`);

  // Issue #1: Having trouble appending directly to variable(weatherInfo)
  weatherInfo.append(weatherCardEl);
  $("#weather-info").append($(weatherCardTitle));
  $("#weather-info").append($(weatherTemp));
  $("#weather-info").append($(weatherSpeed));
  $("#weather-info").append($(weatherHumidity));
}

function fiveDayForecast (userCity) {
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
      renderFiveDay(data);
    });
}

function renderFiveDay (data) {
  forecastContainerEl.empty();
 for (var i = 0; i < data.list.length; i+=8) {
  // console.log(data.list[i]);
  var day = data.list[i];
  var divEl = $(`<div class="col-2">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${day.dt}</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    </div>
  </div>
</div>`)
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
      renderWeatherCard(data);
    });
}

function previousButtonHandler(event) {
  var userCity = $(this).text();
  console.log(userCity);
  // previousCityButton(userCity);
  getCurrentWeather(userCity);
  fiveDayForecast(userCity);
}

function searchButtonHandler(event) {
  event.preventDefault();
  var userCity = $("#cityEntry").val();
  previousCityButton(userCity);
  getCurrentWeather(userCity);
  fiveDayForecast(userCity);
}

$("button").on("click", searchButtonHandler);
buttonContainerEl.on("click", ".previousCity", previousButtonHandler)