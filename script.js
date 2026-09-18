var apiKey = '19314419065743f6b33133932252106';

function getWeather() {
  var city = document.getElementById('cityInput').value.trim();

  var resultDiv = document.getElementById('weatherResult');
  var errorDiv = document.getElementById('errorMsg');

  resultDiv.classList.add('hidden');
  errorDiv.classList.add('hidden');

  if (city === '') return;

  var url = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + city + '&aqi=no';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
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
      errorDiv.textContent = '⚠️ Kuch toh gadbad hai. Internet check karo.';
      errorDiv.classList.remove('hidden');
    });
}

document.getElementById('cityInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    getWeather();
  }
});
