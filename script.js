
document.querySelectorAll('.box').forEach(box =>{
const cityInput = box.querySelector('#city');
const buttonOne = box.querySelector('#buttonOne');
const result = box.querySelector('#result');
buttonOne.addEventListener('click',function(e){
  
  const city = cityInput.value.trim();
  if(!city){
    result.innerHTML ='<p>Please Enter a City name</p>'
  }

const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'bd90c911b2msh7238576818a82f7p1613e0jsn2b67f5fdca7e',
		'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
	}
};
fetch(url,options)
.then(function(response){
    if(!response.ok){
        throw new Error('City not found or API limit exceeded');
    }
    return response.json();
})
.then(function(data){
    const temp = (data.main?.temp - 273.15).toFixed(2);
    const humidity = data.main?.humidity;
   result.innerHTML = `
        <p style="color:black;font-size:20px;"><big>Weather in ${city}</big></p>
        <span><strong>Temperature:</strong> ${temp} °C</span><br>
         <span><strong>Humidity:</strong> ${humidity}</span><br>
         <span><strong>Visibility:</strong> ${data.visibility/1000}Km<br>
         <span><strong>Wind Speed:</strong> ${data.wind.speed}<br>`
  // console.log(data);
})
    .catch(function (error) {
      result.innerHTML = `<p>Error: ${error.message}</p>`;
    });
  });
});

