document.querySelectorAll('.box').forEach(box => {

  const cityInput = box.querySelector('#city');
  const buttonOne = box.querySelector('#buttonOne');
  const result = box.querySelector('#result');

  buttonOne.addEventListener('click', function () {

    const city = cityInput.value.trim();

    if (!city) {
      result.innerHTML = '<p>Please Enter a City name</p>';
      return;
    }

    const url = `https://weather-api167.p.rapidapi.com/api/weather/current?place=${city}`;
    
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'bd90c911b2msh7238576818a82f7p1613e0jsn2b67f5fdca7e', 
        'x-rapidapi-host': 'weather-api167.p.rapidapi.com',
        'Accept': 'application/json'
      }
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) throw new Error('City not found or API limit exceeded');
        return response.json();
      })
      .then(data => {

        console.log(data);
        const temp = data.main.temprature ? (data.main.temprature - 273.15).toFixed(2) : "N/A";
        const humidity = data.main.humidity?? "N/A";
        const visibility = data.visibility_distance ?? "N/A";
        const wind = data.wind.speed ?? "N/A";

        result.innerHTML = `
          <p style="color:black; font-size:20px;">
            <big>Weather in ${city}</big>
          </p>
          <span><strong>Temperature:</strong> ${temp} °C</span><br>
          <span><strong>Humidity:</strong> ${humidity}</span><br>
          <span><strong>Visibility:</strong> ${visibility} Km</span><br>
          <span><strong>Wind Speed:</strong> ${wind}</span><br>
        `;
      })
      .catch(error => {
        result.innerHTML = `<p>Error: ${error.message}</p>`;
      });

  });

});
