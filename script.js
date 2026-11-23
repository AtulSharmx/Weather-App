var apiKey = '19314419065743f6b33133932252106';

function getWeather() {
  var city = document.getElementById('cityInput').value.trim();

  var resultDiv = document.getElementById('weatherResult');
  var errorDiv = document.getElementById('errorMsg');
  var loadingDiv = document.getElementById('loading');
  var searchBtn = document.getElementById('searchBtn');

  resultDiv.classList.add('hidden');
  errorDiv.classList.add('hidden');

  if (city === '') return;

  loadingDiv.classList.remove('hidden');
  searchBtn.disabled = true;

  // A city name can contain spaces, commas or an ampersand, so it is encoded.
  var url = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + encodeURIComponent(city) + '&aqi=no';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      loadingDiv.classList.add('hidden');
      searchBtn.disabled = false;
      if (data.error) {
        if (data.error.code === 1006) {
          errorDiv.textContent = '❌ City nahi mila! Spelling check karo.';
        } else {
          errorDiv.textContent = '🔑 Kuch issue hai: ' + data.error.message;
        }
        errorDiv.classList.remove('hidden');
        return;
      }

      document.getElementById('cityName').textContent = data.location.name + ', ' + data.location.country;
      document.getElementById('temperature').textContent = Math.round(data.current.temp_c) + '°C';
      document.getElementById('description').textContent = data.current.condition.text;

      resultDiv.classList.remove('hidden');
    })
    .catch(function() {
      loadingDiv.classList.add('hidden');
      searchBtn.disabled = false;
      errorDiv.textContent = '⚠️ Kuch toh gadbad hai. Internet check karo.';
      errorDiv.classList.remove('hidden');
    });
}

document.getElementById('cityInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    getWeather();
  }
});
