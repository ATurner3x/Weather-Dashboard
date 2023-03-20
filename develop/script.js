// DEFINE KEY ITEMS
let cityInput = document.getElementById("city"); // user input
let citiesList = []; // build list for local storage in empty array
let todayDate = document.getElementById("todayDate");
let cityForm = document.getElementById("formCity"); // form for input
let buttons = document.getElementById("buttons"); // buttons past search
let cityEl = document.querySelector("#searchedCity"); // city as displayed

// API section

// Todays weather
// My API Key: 3c669846693aa52edecc9a9bd0dce4cb

let getWeather = (city) => {
  let apiURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=3c669846693aa52edecc9a9bd0dce4cb";
  fetch(apiURL1)
    .then((response) => {
        response.json()
          .then((data) => {
              // getWeather => showWeather
              showWeather(data, city);
            });
      });
};

// 5 day forecast

let getForecast = (city) => {
    let apiURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=3c669846693aa52edecc9a9bd0dce4cb";
    fetch(apiURL3)
      .then((response) => {
        response.json()
          .then((data) => {
            // getForecast => showForecast
            showForecast(data, city);
            // DEFINE LAT AND LON VALUES AS VARIABLES
            let lat = data.city.coord.lat;
            let lon = data.city.coord.lon;
          });
      });
  };