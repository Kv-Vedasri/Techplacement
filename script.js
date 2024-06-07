document.addEventListener("DOMContentLoaded", () => {
  const weatherForm = document.getElementById("weather-form");
  const currentLocationBtn = document.getElementById("current-location-btn");
  const loadingSpinner = document.getElementById("loading-spinner");
  const apiKey = "9f49d2b1241fc0b00a6d30ca3f78166e";

  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("city-input").value.trim();
    city
      ? getWeather(`q=${city}`)
      : displayErrorMessage("Please enter a city name");
  });

  currentLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      toggleLoadingSpinner(true);
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          getWeather(`lat=${coords.latitude}&lon=${coords.longitude}`);
        },
        () => {
          displayErrorMessage("Unable to retrieve your location");
          toggleLoadingSpinner(false);
        },
      );
    } else {
      displayErrorMessage("Geolocation is not supported by your browser");
    }
  });

  const getWeather = async (query) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
  };

  const fetchWeatherData = async (url) => {
    toggleLoadingSpinner(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      toggleLoadingSpinner(false);
      response.ok
        ? updateWeatherInfo(data)
        : displayErrorMessage(`Error: ${data.message}`);
    } catch (error) {
      console.error("Fetch error:", error);
      displayErrorMessage("Error fetching weather data");
      toggleLoadingSpinner(false);
    }
  };

  const updateWeatherInfo = (data) => {
    const { name, main, weather, wind, visibility } = data;
    document.getElementById("city-name").textContent = name;
    document.getElementById("temperature").textContent =
      `Temperature: ${main.temp}°C`;
    document.getElementById("description").textContent =
      `Description: ${weather[0].description}`;
    document.getElementById("humidity").textContent =
      `Humidity: ${main.humidity}%`;
    document.getElementById("wind-speed").textContent =
      `Wind Speed: ${wind.speed} m/s`;
    document.getElementById("pressure").textContent =
      `Pressure: ${main.pressure} hPa`;
    document.getElementById("visibility").textContent =
      `Visibility: ${visibility / 1000} km`;

    document.getElementById("weather-info").style.display = "block";
    document.getElementById("error-message").style.display = "none";
  };

  const toggleLoadingSpinner = (show) => {
    loadingSpinner.style.display = show ? "block" : "none";
  };

  const displayErrorMessage = (message) => {
    document.getElementById("error-message").textContent = message;
    document.getElementById("error-message").style.display = "block";
    document.getElementById("weather-info").style.display = "none";
  };
});
