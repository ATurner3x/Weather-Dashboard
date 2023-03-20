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

