document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

async function getWeather(city) {
    const apiKey = '9f49d2b1241fc0b00a6d30ca3f78166e'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

            document.getElementById('weather-info').style.display = 'block';
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Error fetching weather data');
    }
}
