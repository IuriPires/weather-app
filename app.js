window.addEventListener('load', () => {
  let long;
  let lat;
  const API_KEY = '8dc7a06828ba0372e3536535ec0132b5';
  const URL = 'https://api.darksky.net/forecast/';

  function fetchWeather(lat,long) {
    fetch(`${URL}${API_KEY}/${lat},${long}`)
    .then((data) => {
      console.log(data);
    });
  }
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      fetchWeather(lat,long);
    });
    document.querySelector('.degree-section').addEventListener('click', () => {
      fetchWeather(lat,long);
    })
  }
});