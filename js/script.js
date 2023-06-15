
function SearchLocation(event){
    if (event.keyCode !== 13 && event.target.className !== 'ri-search-line') return;
    
    // Input Elements
    var locationSearchElement = document.getElementById('location_search');
    
    if (locationSearchElement.value === '') return;

    // Output Elements
    var tempValueElement = document.getElementById('temp_value');
    var locationOutputElement = document.getElementById('location_output');
    var humidityOutputElement = document.getElementById('humidity_output');
    var windOutputElement = document.getElementById('wind_output');

    var hidden_tempC = document.getElementById('hidden_temp-c');
    var hidden_tempF = document.getElementById('hidden_temp-f');

    // Api Call
    var api_link = `https://api.weatherapi.com/v1/current.json?key=ecbf78b177ac48d0906214808230706&q=${locationSearchElement.value}&aqi=no`;
    fetch(api_link)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            // Process the response data
            hidden_tempC.innerHTML = data.current.temp_c;
            hidden_tempF.innerHTML = data.current.temp_f;

            var temp_location = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
            locationOutputElement.innerHTML = temp_location.slice(0, 40) + '...';
            humidityOutputElement.innerHTML = data.current.humidity;
            windOutputElement.innerHTML = data.current.wind_mph + 'mph / ' + data.current.wind_kph + 'kph';
            
            tempValueElement.style.color = 'white';
            locationOutputElement.style.color = 'greenyellow';
            humidityOutputElement.style.color = 'greenyellow';
            windOutputElement.style.color = 'greenyellow';
            
            ChangeTemperatureFormat();
            console.log(data);
        })
    .catch(error => {
      // Handle any errors
      if (error.message === '400') {
        tempValueElement.innerHTML = "...";
        locationOutputElement.innerHTML = 'Location not found.';
        humidityOutputElement.innerHTML = '...';
        windOutputElement.innerHTML = '...mph / ...kph';

        tempValueElement.style.color = 'red';
        locationOutputElement.style.color = 'red';
        humidityOutputElement.style.color = 'red';
        windOutputElement.style.color = 'red';

        console.log('Location not found.');
        return;
      }
      console.error('Error:', error);
    });
}

function ChangeTemperatureFormat(){
    var tempValueElement = document.getElementById('temp_value');
    var toggleElement = document.getElementById('toggle');

    var hidden_tempC = document.getElementById('hidden_temp-c');
    var hidden_tempF = document.getElementById('hidden_temp-f');

    if (!toggleElement.checked) {
        // Celsius
        tempValueElement.innerHTML = hidden_tempC.innerHTML;
        return;
    }
    // Fahrenheit
    tempValueElement.innerHTML = hidden_tempF.innerHTML;
}