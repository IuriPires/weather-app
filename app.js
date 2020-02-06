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

  function setIcon(icon, iconId) {
    const skycons = new Skycons({ 'color': 'white' });
    skycons.add(document.querySelector('.icon'), Skycons.CLOUDY);
    skycons.play();
  }

  function kelvinToCelcius(temp) {
    let temperature = temp;
    let celcius;

    celcius = (temp - 273.1);
    return parseInt(celcius);
  }
  function appendData(data) {
    const temperature = document.createTextNode(kelvinToCelcius(data.main.temp));
    const timezone = document.createTextNode(data.name);
    const description = document.createTextNode(data.weather[0].description);
    const iconName = data.weather[0].main;

    
    setIcon(iconName.toLowerCase(), 'icon');
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