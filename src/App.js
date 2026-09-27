import React, { useState } from "react";
import axios from "axios";
import Weather from "./Weather";
import "./App.css";

function App() {
  const [city, setCity] = useState("");          // stores user input
  const [weatherData, setWeatherData] = useState(null); // stores API response

  const API_KEY = "a4ea847092e29e5c417a32e65d868947"; // replace with your key

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data); // update state with API data
    } catch (error) {
      alert("City not found!"); // error handling
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {/* Render Weather component only if data exists */}
      {weatherData && <Weather data={weatherData} />}
    </div>
  );
}

export default App;
