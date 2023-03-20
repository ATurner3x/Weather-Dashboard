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
            // getForecast = showForecast
            showForecast(data, city);
            //define coordinates as variables
            let lat = data.city.coord.lat;
            let lon = data.city.coord.lon;
          });
      });
  };

  // submit search and store it

// submitQuery = listCity, getWeather, getForecast
let submitQuery = (event) => {
    event.preventDefault();
    let cityEl = cityInput.value.trim();
    let btn = document.createElement("button"); 
    btn.className = "searched-list btn";
    btn.innerHTML = cityEl; // no duplication
    buttons.appendChild(btn);
    listCity();
    if(!citiesList.includes(cityEl) && (cityEl != "")) {
      citiesList.push(cityEl);
    };
    localStorage.setItem("citiesList", JSON.stringify(citiesList));
    if(cityEl) {
      getWeather(cityEl);
      getForecast(cityEl);
      cityInput.value = "";
    } else {
      alert("Enter a city name to get the weather!");
    }
  };
  // Search history
let listCity = () => {
    citiesList = JSON.parse(localStorage.getItem("citiesList"));
    if(!citiesList) {
      citiesList = [];
    };
  };

  // search history button
let addList = () => {
    for(var i = 0; i < citiesList.length; i++) {
      let btn = document.createElement("button");
      btn.className = "searched-list btn";
      btn.innerHTML = citiesList[i];
      buttons.appendChild(btn); 
    };

      // use history button
  let listButtons = document.querySelectorAll(".searched-list");
  for(var i = 0; i < listButtons.length; i++) {
    listButtons[i].addEventListener("click", (event) => {
      getWeather(event.target.textContent);
      getForecast(event.target.textContent);
    })
  }
};

// Today

todayDate.textContent = moment() .format("dddd, MMMM Do, h:mm a");

// getWeather (API) = showWeather
let showWeather = (weather, searchQuery) => {
  cityEl.textContent = searchQuery;
  iconEl = weather.weather[0].icon;
  document.getElementById("todayIcon")
    .src = "./assets/css/icons/" + iconEl + ".png"; // add icon to assets folder
  document.getElementById("todayTemp")
    .innerHTML = weather.main.temp;
  document.getElementById("todayHumidity")
    .innerHTML = weather.main.humidity;
  document.getElementById("todayWind")
    .innerHTML = weather.wind.speed;
};

// 5 day forecast

document.getElementById("day1")
  .innerHTML = moment()
  .add(1, "d")
  .format("MMMM Do");
document.getElementById("day2")
  .innerHTML = moment()
  .add(2, "d")
  .format("MMMM Do");
document.getElementById("day3")
  .innerHTML = moment()
  .add(3, "d")
  .format("MMMM Do");
document.getElementById("day4")
  .innerHTML = moment()
  .add(4, "d")
  .format("MMMM Do");
document.getElementById("day5")
  .innerHTML = moment()
  .add(5, "d")
  .format("MMMM Do");

let showForecast = (forecast, searchQuery) => {
  cityEl.textContent = searchQuery;
  // 1/5
  document.getElementById("t1")
    .innerHTML = forecast.list[4].main.temp;
  document.getElementById("h1")
    .innerHTML = forecast.list[4].main.humidity;
  iconEl1 = forecast.list[4].weather[0].icon;
  document.getElementById("i1")
    .src = "./assets/css/icons/" + iconEl1 + ".png";
  // 2/5
  document.getElementById("t2")
    .innerHTML = forecast.list[12].main.temp;
  document.getElementById("h2")
    .innerHTML = forecast.list[12].main.humidity;
  iconEl2 = forecast.list[12].weather[0].icon;
  document.getElementById("i2")
    .src = "./assets/css/icons/"  + iconEl2 + ".png";
  // 3/5
  document.getElementById("t3")
    .innerHTML = forecast.list[20].main.temp;
  document.getElementById("h3")
    .innerHTML = forecast.list[20].main.humidity;
  iconEl3 = forecast.list[20].weather[0].icon;
  document.getElementById("i3")
    .src = "./assets/css/icons/" + iconEl3 + ".png";
  // 4/5
  document.getElementById("t4")
    .innerHTML = forecast.list[28].main.temp;
  document.getElementById("h4")
    .innerHTML = forecast.list[28].main.humidity;
  iconEl4 = forecast.list[28].weather[0].icon;
  document.getElementById("i4") 
    .src = "./assets/css/icons/" + iconEl4 + ".png";
  // 5/5
  document.getElementById("t5")
    .innerHTML = forecast.list[36].main.temp;
  document.getElementById("h5")
    .innerHTML = forecast.list[36].main.humidity;
  iconEl5 = forecast.list[36].weather[0].icon;
  document.getElementById("i5")
    .src = "./assets/css/icons/" + iconEl5 + ".png";
  // end 5 day Forecast
};

//listeing for submission
cityForm.addEventListener("submit", submitQuery);
listCity();
addList();

// OPEN WITH DEFAULT VALUES
getWeather("Detroit");
getForecast("Detroit");
