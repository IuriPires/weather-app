window.addEventListener('load', () => {
  let long;
  let lat;
  const API_KEY = '5f34b83499c9209b0ba9b008e1079ffc';
  const URL = `https://api.openweathermap.org/data/2.5/weather`;
  const degreeSection = document.querySelector('.degree-section');
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureDescription = document.querySelector('.temperature-description');

  function fetchWeather(lat,long) {
    fetch(`${URL}?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      appendData(data);
    })
  }
  function kelvinToCelcius(temp) {
    let temperature = temp;
    let celcius;

    celcius = (temp - 273.1);
    return parseInt(celcius);
  }
  function appendData(data) {
    let temperature = document.createTextNode(kelvinToCelcius(data.main.temp));
    let timezone = document.createTextNode(data.name);
    let description = document.createTextNode(data.weather[0].description);
    console.log(data);
    
    locationTimezone.appendChild(timezone);
    temperatureDegree.appendChild(temperature);
    temperatureDescription.appendChild(description);
  }
  if(navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      fetchWeather(lat,long);
    });
  }
});