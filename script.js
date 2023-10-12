var weatherInfo = $('weatherCardInfo');

var apiKey = "8782fbdc8ad65017cca5cc8fc9745533";



function renderWeatherCard() {
  console.log("Ran");
  // console.log(data);
  // Create the div to display the weather card
  // var weatherCard = $("<div class='card-body'></div>");
  // weatherCard.html("Hello");
  // var weatherCard = $('<div>', {
  //   class: 'card-body',
  //   title: 'now this div has a title!'
  // })
  // console.log(weatherCard);
  // Append the weather onto the screen.
  // console.log(weatherInfo);
  // $(weatherInfo).append($(weatherCard));

}


$('button').click(function(event) {
    var userCity = $('#cityEntry').val();
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${apiKey}`;
    event.preventDefault();
    console.log("Ran");
fetch(queryURL)
.then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        // renderWeatherCard();

        // Testing appending for weatherInfo card.

        // Creating the div for the card
        var weatherCardEl = $('<div>', {
            class: 'card-body',
            id: 'weather-info'
          })

          // Creating title of city for the card.
          var weatherCardTitle = $('<h5>', {
            class: 'card-title',
          })
          weatherCardTitle.text(`${data.name}${dayjs().format("(M/D/YYYY)")}`);

          // Creating temperature tag
          var weatherTemp = $('<h6>', {
            class: 'card-subtitle mb-2 p-1 text-muted',
          })
          weatherTemp.text(`Temp: ${data.main.temp} °F`);

          // Creating wind speed tag
          var weatherSpeed = $('<h6>', {
            class: 'card-subtitle mb-2 p-1 text-muted',
          })
          weatherSpeed.text(`Wind Speed: ${data.wind.speed} MPH`);

          // Creating humidity tag
          var weatherHumidity = $('<h6>', {
            class: 'card-subtitle mb-2 p-1 text-muted',
          })
          weatherHumidity.text(`Humidity: ${data.main.humidity}%`);

        // Issue #1: Having trouble appending directly to variable(weatherInfo)
        $("#weatherCardInfo").append($(weatherCardEl));
        $("#weather-info").append($(weatherCardTitle));
        $("#weather-info").append($(weatherTemp));
        $("#weather-info").append($(weatherSpeed));
        $("#weather-info").append($(weatherHumidity));


      })
    } 
    else {
        alert("City not found!");
    }
  })
})


