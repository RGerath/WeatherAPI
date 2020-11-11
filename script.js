const wicon = document.querySelector(".wIcon");
const wtext = document.querySelector(".wText");

function refresh() {
	//	find the weather data necessary to update the HTML elements if available
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeather, errWeather);
	}
}

function errWeather() {
	//	error handling for non-geolocation navigators here
}

async function getWeather(pos) {
	//	use free weather API to gather information about pos (cloud cover and precipitation)
	var apiKey = "df4fa1c781def995d1384bbbaaf3b3d5";
	var lat = pos.coords.latitude;
	var lon = pos.coords.longitude;
	
	var api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lat}&appid=${apiKey}`;
	
	var response = await fetch(api)
	data = await response.json();
	//	consolidate weather types to basic types before terminating getWeather
	var newIcon = "error";
	var newText = data.weather[0].description;
	//	standardize text
	if (newText.includes("rain")) {
		newText = "Rain";
		newIcon = "rain";
	} else if (newText.includes("snow")) {
		newText = "Snow";
		newIcon = "snow";
	} else if (newText.includes("cloud")) {
		newText = "Cloudy";
		newIcon = "cloud";
	} else if (newText.includes("clear")) {
		newText = "Clear";
		newIcon = "clear";
	} else {
		newText = "Unknown type: " + newText;
		newIcon = "error";
	}
	wicon.innerHTML = `<img src="resources/${newIcon}.png"/>`;
	wtext.innerHTML = newText;
}